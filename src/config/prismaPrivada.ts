import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/privada/client.js";

const connectionString = process.env.DATABASE_URL_PRIVADA;

if (!connectionString) {
  throw new Error(
    "No se encontró DATABASE_URL_PRIVADA en el archivo .env"
  );
}

const adapter = new PrismaPg({
  connectionString,
  connectionTimeoutMillis: 3000,
});

export const prismaPrivada = new PrismaClient({
  adapter,
});
