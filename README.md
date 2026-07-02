# Tripleten web_project_api_full

This project combines and improves the frontend and backend content of Around The U.S., previously developed.

It is a simple social media-style SPA for photo sharing where users can post photos of their adventures, like them, delete them, or update their profile by editing their personal information or avatar.

It includes a login and registration process for new users, as well as a JWT-based system to preserve user session information.

## Server Access

- Frontend: https://around19.mooo.com
- Backend API: https://api.around19.mooo.com

## Features

- User registration and authorization
- Edit profile and avatar
- Add and delete cards
- Add and remove likes
- Log out

## Technologies Used

Frontend:

- React
- React Router DOM
- Vite

Backend:

- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) — for authentication
- bcryptjs — for password hashing
- celebrate + validator — for data validation
- winston + express-winston — for logging
- dotenv — for environment variables
- cors — for CORS handling

## API Endpoints

- POST /signup
- POST /signin

Cards:

- GET /cards
- POST /cards
- DELETE /cards/:cardId
- PUT /cards/:cardId/likes
- DELETE /cards/:cardId/likes

Users:

- GET /users
- GET /users/me
- GET /users/:id
- PATCH /users/me
- PATCH /users/me/avatar

## Environment Variables

Create a `.env` file inside `backend/` with:

NODE_ENV=production
JWT_SECRET=your-secret-jwt-key

If `NODE_ENV` is not `production`, the secret key will be ignored.

## Local Setup

Clone the `web_project_api_full` repository.

Backend:

Install dependencies with `npm install`
Create the `.env` file
Run the server with `npm run dev`

Frontend:

Install dependencies with `npm install`
Run the frontend with `npm run dev`

# Tripleten web_project_api_full

Este proyecto reune y mejora el contenido de el frontend y backend de Around The U.S. hecho anteriormente.

Es una SPA sencilla en formato red social de photos sharing donde podemos publicar fotos de nuestras aventuras, darles like, borrarlas o decidir mejorar nuestro perfil editando nuestras informaciones o nuestro avatar.

Hay un proceso de login y registracion para nuevos usuarios, pero también cuenta con un sistema de preservación de la info usando JWT.

## Acceso al servidor

- Frontend: https://around19.mooo.com
- Backend API: https://api.around19.mooo.com

## Funcionalidades

- Registro y autorización
- Editar perfil y avatar
- Agregar y eliminar tarjetas
- Agregar y eliminar "me gusta"
- Cierre de sesión

## Tecnologías utilizadas

Frontend:

- React
- React Router DOM
- Vite

Backend:

- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) — para autenticación
- bcryptjs — para encriptación de contraseñas
- celebrate + validator — para validación de datos
- winston + express-winston — para logging
- dotenv — para variables de entorno
- cors — para manejo de CORS

## Endpoints de la API

- POST /signup
- POST /signin

Cards:

- GET /cards
- POST /cards
- DELETE /cards/:cardId
- PUT /cards/:cardId/likes
- DELETE /cards/:cardId/likes

Users:

- GET /users
- GET /users/me
- GET /users/:id
- PATCH /users/me
- PATCH /users/me/avatar

## Variables de entorno

Crear file .env en backend/ con:
NODE_ENV=production
JWT_SECRET=clave-secreta-para-jwt

Si el env no es production, la clave será ignorada.

## Uso local

Clone del repo web_project_api_full

Backend:

Instalar dependencias con `npm install`
Crear file .env
Correr el servidor con `npm run dev`

Frontend:

Instalar dependencias con `npm install`
Correr el frontend con `npm run dev`
