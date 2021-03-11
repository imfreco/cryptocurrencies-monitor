# Cryptocurrencies Monitor API

API Rest para el monitoreo de criptomonedas utilizando CoinGecko como proveedor de los datos requeridos

## Instrucciones

- Clonar el repositorio
- Instalar dependencias necesarias ***npm install***
- Creación del archivo ***.env*** y su respectivo relleno basado en ***.env.sample*** ubicado en la raíz del proyecto
- Ejecutar composición de contenedores ***docker-compose up -d***
- Ejecutar pruebas automatizadas ***npm run start:test***
- Ejecutar aplicación en entorno de desarrollo ***npm run start:dev***

## Documentación

- [Postman Documentation](https://documenter.getpostman.com/view/8791001/Tz5p5HWL)

## Ingeniería de Software

La arquitectura de software utilizada:

- N Capas (Middlewares, Controllers, Services, Repositories, Models)

Algunos patrones de diseño implementados son:

- Inyección de dependencias
- Singleton

Las herramientas utilizadas son:

- Node.js
- Express.js

Las bibliotecas utilizadas son:

- express-validator
- awilix
- bcrypt
- compression
- helmet
- jsonwebtoken
- sequelize
- jest
- supertest

## Justificación (Decisiones Tomadas)
