# File uploading

---

## Table of Contents <!-- omit in toc -->

- [General info](#general-info)
- [Drivers support](#drivers-support)
- [Uploading and attach file flow](#uploading-and-attach-file-flow)
  - [An example of uploading an avatar to a user profile](#an-example-of-uploading-an-avatar-to-a-user-profile)
  - [Video example](#video-example)
- [How to delete files?](#how-to-delete-files)

---

## General info

`MulterModule` from `@nestjs/platform-express` is used to upload files. General principles can be found in [official documentation](https://docs.nestjs.com/techniques/file-upload).

---

## Drivers support

Out of box this application supports two drivers: `local` and `s3`. It can be set it in `.env` file, variable `FILE_DRIVER`.

---

## Uploading and attach file flow

Endpoint `/api/v1/files/upload/:lessonId` is used for uploading files for each lesson by `lessonId`, which returns `File` entity with `id` and `path` as well as storing it on selected driver.

## Delete files?

This application does not delete files, as this may have negative experience during restoring data. Also for this reason application also uses [Soft-Delete](https://orkhan.gitbook.io/typeorm/docs/delete-query-builder#soft-delete) approach in database. 

---

Previous: [Auth](auth.md)