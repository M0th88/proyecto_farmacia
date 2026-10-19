# Iniciar el backend en Windows

## 1. Preparar Docker (pendiente en este equipo)

En PowerShell como administrador:

```powershell
wsl --install --no-distribution
```

Reinicia Windows si se solicita. Luego instala Docker Desktop:

```powershell
winget install -e --id Docker.DockerDesktop
```

Abre Docker Desktop, completa su primera configuración con WSL 2 y espera que el motor esté iniciado. Abre una nueva terminal y comprueba:

```powershell
wsl --version
docker --version
docker compose version
docker info
```

Si Docker está instalado pero no se encuentra el comando, reinicia la terminal (y el editor que la abrió) para renovar PATH. No reinstales sin comprobar la instalación existente.

Fuentes: [Docker para Windows](https://docs.docker.com/desktop/setup/install/windows-install/) y [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

## 2. Iniciar el proyecto

Desde la carpeta que contiene package.json y docker-compose.yml:

```powershell
npm.cmd ci
npm.cmd run db:up
npm.cmd run db:deploy
npm.cmd run check
npm.cmd run dev
```

Si falta .env, copia .env.example a .env y configura las credenciales locales antes de ejecutar estos comandos. Los clientes Prisma se generan con check/build.

Prueba http://localhost:4000/api/health. Solo debe responder OK cuando ambas bases y sus tablas estén disponibles.

## 3. Bases separadas

Un servidor PostgreSQL 16 contiene farmacia_privada y farmacia_asistencial. Cada base tiene su configuración Prisma, cliente y migraciones independientes. Comparten el usuario de desarrollo; esto no constituye aislamiento de permisos entre usuarios.

```powershell
docker compose exec postgres psql -U farmacia -d postgres -c "SELECT datname FROM pg_database WHERE datname IN ('farmacia_privada', 'farmacia_asistencial');"
```

La inicialización SQL se ejecuta solo al crear un volumen nuevo. Si existe un volumen previo, inspecciona primero las bases y crea únicamente las que falten con CREATE DATABASE. No borres el volumen para corregirlo.

Para detener PostgreSQL conservando datos: `npm.cmd run db:stop`.

## Alcance

La estructura inicial incluye usuarios, roles, categorías, medicamentos, lotes, ubicaciones, stock y movimientos. Ventas, recetas, pacientes, dispensaciones y demás carpetas son puntos de extensión; todavía no implementan endpoints. No se ha importado el Excel ni consultado los adjuntos originales porque no están disponibles en este chat.
