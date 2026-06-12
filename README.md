<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO / BANNER -->
<br />
<div align="center">

![BREAK](https://github.com/user-attachments/assets/4748959c-aef5-4208-ad96-0caae1e7df35)

</div>

![Presentacion](https://github.com/user-attachments/assets/bee87c8d-fe75-4f20-97cf-9e228bbba0a1)

---

# ⏱️ Break & Focus

> Un temporizador inteligente que alterna **enfoque** y **pausas activas**: concentrate, dejá que la alarma te avise cuándo parar y descansá. Estudiá y trabajá mejor, sin agotarte.

🔗 **Demo en vivo:** _(agregá acá tu URL de Vercel una vez desplegado)_

<br />

## ✨ ¿Qué hace?

Break & Focus aplica técnicas de productividad comprobadas para que mantengas un equilibrio saludable entre concentración y recuperación:

- ⏲️ **Técnicas listas para usar** — Pomodoro (25/5), 52/17 y Pausa Activa, o configurá tus propios minutos.
- 🔔 **Alarma sonora** — suena al terminar cada bloque de enfoque y de descanso; no tenés que mirar el reloj.
- 🎯 **Anillo de progreso** — visualizás el avance de cada bloque de un vistazo.
- 🎨 **Personalización** — ajustá tiempos, color o imagen de fondo a tu gusto.
- 💾 **Sin cuenta y persistente** — entrás y empezás en 1 clic; tu configuración se guarda en el navegador (localStorage).

> El temporizador funciona de forma **100% autónoma en el navegador** (no requiere backend). El backend habilita funciones extra como cuentas de usuario y estadísticas.

<br />

## 🛠️ Stack

**Frontend**

[![Next.js][Next.js]][Next-url] [![React.js][React.js]][React-url] [![TypeScript][TypeScript]][TypeScript-url] [![Zustand][Zustand]][Zustand-url] [![Axios][Axios]][Axios-url] [![TailwindCSS][TailwindCSS]][TailwindCSS-url]

**Backend**

[![NodeJS][NodeJS]][Node-url] [![Express.js][Express.js]][Express-url] [![TypeScript][TypeScript]][TypeScript-url] [![MongoDB][MongoDB]][MongoDB-url] [![Mongoose][Mongoose]][Mongoose-url] [![Passport][Passport]][Passport-url] [![Zod][Zod]][Zod-url]

**Diseño**

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
· [Ideas](https://www.figma.com/board/6xpeDZMxKlPqm7xTPzZbfl/Break-and-focus) · [Prototipo](https://www.figma.com/design/oc2sSuVpy9hgPNTmeg9nlP/Break-and-Focus)

<br />

## 📁 Estructura

Monorepo con dos aplicaciones independientes:

```
s18-09-m-node-react/
├── frontend/   # Next.js 14 + React 18 + TypeScript (UI / temporizador)
└── backend/    # Express + TypeScript + MongoDB (auth, técnicas, sesiones)
```

<br />

## 🚀 Cómo correrlo localmente

### Prerrequisitos
- [Node.js](https://nodejs.org/en) instalado (`node -v` para verificar).

### 1. Cloná el repositorio
```sh
git clone https://github.com/No-Country-simulation/s18-09-m-node-react.git
cd s18-09-m-node-react
```

### 2. Backend (puerto 3000)
```sh
cd backend
npm install
npm run dev
```
> Necesita un archivo `.env` con `PORT`, `DBASE_URL` (MongoDB), `JWT_SECRET`, `BCRYPT_ROUNDS` y, opcionalmente, `EMAIL` / `EMAIL_APP_PASSWORD` para los mails.
> Documentación de la API en `http://localhost:3000/api-docs`.

### 3. Frontend (puerto 3001)
```sh
cd frontend
npm install
npm run dev
```
> Abrí `http://localhost:3001`. La URL del backend se configura con `NEXT_PUBLIC_BASE_API_URL` en `frontend/.env`.

<br />

## 📜 Scripts

| App | Comando | Descripción |
|-----|---------|-------------|
| Frontend | `npm run dev` | Servidor de desarrollo (Next.js) |
| Frontend | `npm run build` | Build de producción (export estático a `/out`) |
| Frontend | `npm run lint` | ESLint |
| Backend | `npm run dev` | Desarrollo con recarga (tsx watch) |
| Backend | `npm run build` | Compila TypeScript a `/dist` |
| Backend | `npm start` | Corre el build compilado |

<br />

## ☁️ Despliegue

- **Frontend** → [Vercel](https://vercel.com) (Root Directory: `frontend`, export estático).
- **Backend** → [Railway](https://railway.app) u otro proveedor Node + MongoDB Atlas.

<br />

## 👤 Autor

Proyecto desarrollado de forma individual por **Benjamín Peyraga**.

<br />

## 🙌 Reconocimientos

- [No Country](https://www.nocountry.tech/) — por el impulso para lanzar el proyecto.

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/No-Country-simulation/s18-09-m-node-react.svg?style=for-the-badge
[contributors-url]: https://github.com/No-Country-simulation/s18-09-m-node-react/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/No-Country-simulation/s18-09-m-node-react.svg?style=for-the-badge
[stars-url]: https://github.com/No-Country-simulation/s18-09-m-node-react/stargazers
[issues-shield]: https://img.shields.io/github/issues/No-Country-simulation/s18-09-m-node-react.svg?style=for-the-badge
[issues-url]: https://github.com/No-Country-simulation/s18-09-m-node-react/issues

[Next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[NodeJS]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Mongoose]: https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=MongoDB&logoColor=white
[Mongoose-url]: https://mongoosejs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Passport]: https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white
[Passport-url]: https://www.passportjs.org/
[Zod]: https://img.shields.io/badge/Zod-5B8DBD?style=for-the-badge
[Zod-url]: https://zod.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Zustand]: https://img.shields.io/badge/Zustand-005570?style=for-the-badge
[Zustand-url]: https://zustand-demo.pmnd.rs/
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[Axios-url]: https://axios-http.com/
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
