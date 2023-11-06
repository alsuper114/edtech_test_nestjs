# Installation

---

## Table of Contents <!-- omit in toc -->

- [Comfortable development](#comfortable-development)
- [Links](#links)

---

## Preparation

### `Node v18.16.0` or `Yarn v1.22.19`

## Comfortable development

1. Clone repository

   ```bash
   git clone https://github.com/profullstackdeveloper/edtech-test
   ```

1. Go to folder, and copy `env-example` as `.env`.

   ```bash
   cd edtech-test/
   cp env-example .env
   ```

1. Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

1. Run additional container:

   ```bash
   docker compose up -d postgres redis
   ```

1. Install dependency

   ```bash
   npm install --force
   ```
   or
   ```bash
   yarn
   ```

1. Run migrations

   ```bash
   npm run migration:run
   ```

1. Run seeds

   ```bash
   npm run seed:run
   ```

1. Run app in dev mode

   ```bash
   npm run start:dev
   ```

1. Open <http://localhost:3000>

---

## Quick run

If you want quick run your app, you can use following commands:

1. Clone repository

   ```bash
   git clone https://github.com/profullstackdeveloper/edtech-test

   ```

1. Go to folder, and copy `env-example` as `.env`.

   ```bash
   cd edtech-test/
   cp env-example .env
   ```

1. Run containers

   ```bash
   docker compose up -d
   ```

1. For check status run

   ```bash
   docker compose logs
   ```

1. Open <http://localhost:3000>



## OpenAPI Link

- Swagger (API docs): <http://localhost:3000/docs>

---

Previous: [Introduction](introduction.md)

Next: [Working with database](database.md)
