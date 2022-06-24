# File Manager Api v1.0

`File Manager Api` es el backend para una aplicación de gestión de imagenes.

## Features

-   Creación de usuarios (Local y via Google OAUTH)
-   Mostrar listado de usuarios registrados.
-   Login Local.
-   Login de Google (OAUTH).
-   Envío de email para recuperación de contraseña.
-   Recuperación de contraseña.
-   Subida de Imagenes (A servidor de Cloudinary).
-   Mostrar listado de imagenes subidas por el usuario logueado.
-   Mostrar datos de imagen por ID.
-   Buscador de Imagenes (Api externa Unsplash).
-   Subida de imagenes remota (por URL de la imagen).
-   Protección de endpoints con JSON Web Tokens (JWT).

## Tech Stack

-   Javascript.
-   NodeJS.
-   ExpressJS.
-   MySQL.
-   Sequelize.

## Herramientas de Desarrollo y otras tecnologías

-   [Axios](https://www.npmjs.com/package/axios)
-   [Babel](https://babeljs.io/)
-   [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
-   [Chalk](https://www.npmjs.com/package/chalk)
-   [Cloudinary](https://cloudinary.com/)
-   [Cors](https://www.npmjs.com/package/cors)
-   [Dotenv](https://www.npmjs.com/package/dotenv)
-   [ExpressJS](https://expressjs.com/)
-   [Express Validator](https://express-validator.github.io/docs/)
-   [Json Web Token](https://jwt.io/)
-   [Nodejs](https://nodejs.org/en/)
-   [Nodemailer](https://nodemailer.com/about/)
-   [Nodemon](https://www.npmjs.com/package/nodemon)
-   [Morgan](https://www.npmjs.com/package/morgan)
-   [MySQL](https://www.mysql.com/)
-   [Sequelize v6.9](https://sequelize.org/v6/)
-   [Vscode](https://code.visualstudio.com/)

## URL de la Api

-   [Api Heroku](https://file-manager-api-2022.herokuapp.com/)
-   [Api Local](http://localhost:4000/)

## Requerimientos

-   Nodejs v16 o superior.
-   Express v4 o superior.
-   Sequelize v6.9.
-   MySQL 5.7.14 o superior.
-   Sequelize v6.21.

## Instalación

-   npm install
-   Crear las variables de entorno, ver archivo `.env.example`

## Ejecutar la api

-   npm run dev `(Modo Development)`
-   npm start `(Modo Production)`

## Archivo de entrada

-   src/app.js
