import express from "express";
import cors from "cors";

import { prismaPrivada } from "./config/prismaPrivada.js";
import { prismaAsistencial } from "./config/prismaAsistencial.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    nombre: "API Sistema de Farmacias",
    mensaje: "Backend funcionando correctamente",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const [medicamentosPrivada, medicamentosAsistencial] =
      await Promise.all([
        prismaPrivada.medicamento.count(),
        prismaAsistencial.medicamento.count(),
      ]);

    res.json({
      status: "OK",

      basesDatos: {
        privada: {
          estado: "conectada",
          medicamentos: medicamentosPrivada,
        },

        asistencial: {
          estado: "conectada",
          medicamentos: medicamentosAsistencial,
        },
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "ERROR",
      mensaje: "No se pudo conectar correctamente a las bases de datos",
    });
  }
});

export default app;