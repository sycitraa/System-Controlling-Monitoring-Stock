// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required in environment variables");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js", // 👈 Tambahkan baris ini di sini
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});