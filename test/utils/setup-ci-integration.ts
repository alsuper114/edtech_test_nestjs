import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { AppModule } from 'src/app.module'
import { Connection, DatabaseType, createConnection, getConnection, getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { factory } from 'typeorm-seeding';
import { UserSeedService } from 'src/database/seeds/user/user-seed.service';
import { RoleSeedService } from 'src/database/seeds/role/role-seed.service';

function getDBConnection(dbName: string): Promise<Connection> {
    const connectionManager = getConnectionManager();
    const connectionName = dbName;

    if (connectionManager.has(connectionName)) {
        const connection = connectionManager.get(connectionName);
        return Promise.resolve(connection.isConnected ? connection : connection.connect());
    }

    const testDBORMConfig: TypeOrmModuleOptions = {
        type: (process.env.DATABASE_TYPE) as DatabaseType,
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        password: process.env.DATABASE_PASSWORD,
        username: process.env.DATABASE_USERNAME,
        synchronize: false,
        logging: false,
        autoLoadEntities: true,
        entities: [join(__dirname, "../../**/*.entity{.ts,.js}")],
        migrations: [join(__dirname, "src/database/migrations/*{.ts,.js}")]
    }

    const setting = {
        ...(testDBORMConfig as PostgresConnectionOptions),
        name: connectionName,
        database: dbName
    }

    return createConnection(setting);
}

export async function setupContinuousIntegrationTest() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
    }).compile();

    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        })
    )

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const connection = await getDBConnection(process.env.TEST_DATABASE_NAME ?? "edTechTest");
    await connection.runMigrations();

    const roleSeedService = app.get(RoleSeedService);
    const userSeedService = app.get(UserSeedService);

    await roleSeedService.run();
    await userSeedService.run();


    await app.init();
    return app;
}

export const truncateTables = async (): Promise<void> => {
    try {
        const connection = getConnection(process.env.TEST_DATABASE_NAME);
        const entities = connection.entityMetadatas;
        for await (const entity of entities) {
            const repository = connection.getRepository(entity.name);

            const tableExisted = await repository.manager.query(
                `SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = '${entity.tableName}');`
            );

            if (tableExisted && tableExisted[0].exists) {
                if (entity.schema) {
                    await repository.query(
                        `TRUNCATE "${entity.schema}"."${entity.tableName}" RESTART IDENTITY CASCADE;`
                    );
                } else {
                    await repository.query(
                        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
                    );
                }
            }
        }
    } catch (err) {
        throw new Error(err);
    }
}