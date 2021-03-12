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

### Patrones de Arquitectura

La arquitectura de software de N Capas es una excelente alternativa para construir una API Rest con Node.js. En este proyecto se diseñaron 5 capas:

- **Middlewares:** Primer capa, la cual tiene comunicación directa con la petición del cliente.
Estos se pueden encargar de tareas como:
  - el control de acceso por identificación o por privilegios
  - validaciones por objetos de transferencia de datos (DTOs)

- **Controllers:** Siguiente capa, la cual está pendiente de los datos que llegan previamente validados para ser enviados a los servicios correspondientes.

- **Services:** Tercera capa, encargada de aplicar la lógica de negocio requerida, comunicación con servicios propios o ***externos***.

- **Repositories:** Capa encargada de ser intermediaria entre los servicios y el acceso a datos.

- **Models:** Capa de mapeo relacional de objetos (ORM) la cual tiene comunicación directa con la base de datos.

### Patrones de Diseño

Es un tema fundamental, por ello se aplican algunas buenas prácticas como el patrón de ***inyección de dependencia*** que ofrece la biblioteca **awilix** para reducir el nivel de acoplamiento.

La multiple creación de instancias es innecesaria al inyectar las dependencias requeridas, por ello se implementa el patron creacional ***singleton***.


### Buenas prácticas para API's

#### Uso correcto de los metodos HTTP

Los métodos http utilizados en esta API Rest son:

- GET:
  - Consultar las criptomonedas disponibles.
  - Consutar el top N de criptomonedas que posee un usuario específico.

- POST:
  - Creación de un usuario.
  - Creación de token de identificación y refresco para la autenticación sin estado.
  - Asignación de criptomoneda a usuario en específico.

#### Convención a nombres de rutas

Las rutas implementadas son:

- GET: /v1/api/coins
- GET: /v1/api/users/:userId/coins/top
- POST: /v1/api/users
- POST: /v1/api/auth/signin
- POST: /v1/api/coins/:coinId/user/:userId

#### Uso de códigos de estado

Los códigos de estado utilizados son:

- 200: Recurso obtenido correctamente
- 201: Recurso creado correctamente
- 400: Error del cliente, algo no permitido por la lógica de negocio
- 401: Error de identificación, falta de autenticación
- 403: Error de autorización, falta de privilegios
- 404: Recurso no encontrado, no existe dicho recurso
