# TaskGuard – To-Do List App (MERN + JWT)

![CI](https://img.shields.io/github/actions/workflow/status/yourusername/taskguard/ci.yml?branch=main)
![License](https://img.shields.io/badge/License-GPLv3-blue)

Gestor de tareas open-source centrado en la **privacidad**: autenticación con JWT en cookie `HttpOnly`, cifrado de contraseñas y política CORS estricta.

## ⚙️ Tech Stack

Backend: Node.js · Express · MongoDB · Mongoose · JWT · Helmet · Rate-Limit

Frontend: React 18 · Vite · Axios · React Router DOM

Testing: Jest · Supertest · MongoDB-Memory-Server · GitHub Actions

## 🎯 Características

1. Registro / Inicio de sesión protegido (JWT en cookie `HttpOnly + Secure`)
2. CRUD de tareas con filtrado por estado (todas | pendientes | completadas)
3. Permisos basados en usuario (nadie puede modificar tareas ajenas)
4. Seguridad extra (Helmet, Rate-Limit, sin token en `localStorage`)
5. Suite de pruebas completa (14 tests ‑ 100 % rutas críticas)

## 📂 Estructura

```txt
franxx/
 ├─ client/         # Frontend React (Vite)
 ├─ server/         # API Express + Mongo
 │   ├─ app.js      # Exporta instancia Express (tests)
 │   ├─ index.js    # Arranque del servidor
 │   └─ tests/      # Jest/Supertest suites
 └─ .github/        # Workflows CI
```

## 🚀 Instalación Rápida

```bash
# 1. Clona el repo
 git clone https://github.com/yourusername/taskguard.git
 cd taskguard

# 2. Backend
 cd server
 cp .env.example .env   # Añade MONGO_URI y JWT_SECRET
 npm install
 npm run dev            # http://localhost:5000

# 3. Frontend
 cd ../client
 cp .env.example .env   # VITE_API_URL=http://localhost:5000/api
 npm install
 npm run dev            # http://localhost:5173
```

## 🧪 Tests

```bash
cd server
npm test
```
Se inicia MongoDB en memoria y se ejecutan **14 tests** de autenticación, permisos y CRUD.

## 🔒 Privacidad & Seguridad

| Medida                        | Explicación |
| ----------------------------- | ----------- |
| Contraseñas hash **bcrypt**   | 10 rounds |
| JWT en **cookie HttpOnly**    | Invisible a JS → protege XSS |
| `Secure` + `SameSite=Lax`     | Mitiga CSRF |
| **Helmet**                    | Cabeceras seguras por defecto |
| **Rate-Limit** en /api/auth   | Evita fuerza bruta |
| Token nunca en localStorage   | El frontend guarda solo el `user` |

## 📜 Scripts Útiles

```bash
# Ejecutar ambos servicios (requiere concurrently)
npm install -D concurrently
npm run dev          # ver package.json raíz
```

## 🔄 CI / CD

GitHub Actions (`.github/workflows/ci.yml`) instala dependencias y ejecuta pruebas en cada push o PR.

## 🌐 Deploy

1. **Backend**: Render / Fly.io / Docker (puerto 5000)
2. **Frontend**: Vercel / Netlify (`npm run build` en `client/`)

Configura variables `MONGO_URI`, `JWT_SECRET` y `CLIENT_URL` (origen permitido CORS).

## 🤝 Contribuciones

¡Pull requests bienvenidas! Por favor, abre un issue primero para discutir cambios mayores.

## 📝 Licencia

Distribuido bajo la **GNU GPL v3 o posterior**. Consulta el archivo `LICENSE`. 