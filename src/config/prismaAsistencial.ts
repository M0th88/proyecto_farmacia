import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/asistencial/client.js";

const connectionString = process.env.DATABASE_URL_ASISTENCIAL;

if (!connectionString) {
  throw new Error(
    "No se encontró DATABASE_URL_ASISTENCIAL en el archivo .env"
  );
}

const adapter = new PrismaPg({
  connectionString,
  connectionTimeoutMillis: 3000,
});

export const prismaAsistencial = new PrismaClient({
  adapter,
});
