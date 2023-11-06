# Work with database

It uses [TypeORM](https://www.npmjs.com/package/typeorm) and [PostgreSQL](https://www.postgresql.org/) for working with database.

---

## Table of Contents <!-- omit in toc -->

- [Working with database schema](#working-with-database-schema)
  - [Database Design](#database-design)
  - [Generate migration](#generate-migration)
  - [Run migration](#run-migration)
  - [Revert migration](#revert-migration)
  - [Drop all tables in database](#drop-all-tables-in-database)
- [Seeding](#seeding)
  - [Creating seeds](#creating-seeds)
  - [Run seed](#run-seed)
- [Performance optimization](#performance-optimization)
  - [Indexes and Foreign Keys](#indexes-and-foreign-keys)
  - [Max connections](#max-connections)

---

## Working with database schema

### Database Design

[This link](https://dbdiagram.io/d/6548ba0f7d8bbd6465911735) is for the whole table structures,

### Generate migration

1. Create entity file with extension `.entity.ts`. For example `example.entity.ts`:

   ```ts
   // /src/posts/entities/post.entity.ts

   import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
   import { EntityHelper } from 'src/utils/entity-helper';

   @Entity()
   export class Example extends EntityHelper {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     title: string;

     @Column()
     body: string;

     // Here any fields what you need
   }
   ```

1. Next, generate migration file:

   ```bash
   npm run migration:generate -- src/database/migrations/CreatePostTable
   ```

1. Apply this migration to database via [npm run migration:run](#run-migration).

### Run migration

```bash
npm run migration:run
```

### Revert migration

```bash
npm run migration:revert
```

### Drop all tables in database

```bash
npm run schema:drop
```

---

## Seeding

### Creating seeds

1. Create seed file with `npm run seed:create -- --name=Example`. Where `Example` is name of entity.
1. Go to `src/database/seeds/example/example-seed.service.ts`.
1. In `run` method extend your logic.
1. Run [npm run seed:run](#run-seed)

### Run seed

```bash
npm run seed:run
```

---

### Max connections

Set the optimal number of [max connections](https://node-postgres.com/apis/pool) to database for the application in `/.env`:

```txt
DATABASE_MAX_CONNECTIONS=100
```

This parameter can be thought as how many concurrent database connections this application can handle.

---

Previous: [Installing and Running](installing-and-running.md)

Next: [Auth](auth.md)
