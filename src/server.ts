import "dotenv/config";

import app from "./app.js";
import { prismaPrivada } from "./config/prismaPrivada.js";
import { prismaAsistencial } from "./config/prismaAsistencial.js";

const PORT = Number(process.env.PORT) || 4000;

const server = app.listen(PORT, () => {
  console.log("");
  console.log("========================================");
  console.log("     SISTEMA DE FARMACIAS - BACKEND");
  console.log("========================================");
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log("========================================");
  console.log("");
});

async function cerrarServidor() {
  console.log("Cerrando servidor...");

  await Promise.all([
    prismaPrivada.$disconnect(),
    prismaAsistencial.$disconnect(),
  ]);

  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", cerrarServidor);
process.on("SIGTERM", cerrarServidor);