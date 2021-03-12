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

La múltiple creación de instancias es innecesaria al inyectar las dependencias requeridas, por ello se implementa el patron creacional ***singleton***.

### Persistencia de Datos

Para la administración de datos, se hace uso de la composición de contenedores de docker, creando dos contenedores:

- **postgres:** Encargado de la administración de datos en el entorno de ***desarrollo***.

- **mysql:** Encargado de la administración de datos en el entorno de ***pruebas***.

Sin embargo, al ser dos sistemas de gestión de base de datos diferentes, se decide hacer uso del potencial de los ORM's como lo es ***Sequelize***.

### Buenas prácticas para API's

#### Uso correcto de los métodos HTTP

Los métodos http utilizados en esta API Rest son:

- **GET:**
  - Consultar las criptomonedas disponibles.
  - Consutar el top N de criptomonedas que posee un usuario específico.

- **POST:**
  - Creación de un usuario.
  - Creación de token de identificación y refresco para la autenticación sin estado.
  - Asignación de criptomoneda a usuario en específico.

#### Convención a nombres de rutas

Las rutas implementadas son:

- **GET:** /v1/api/coins
- **GET:** /v1/api/users/:userId/coins/top
- **POST:** /v1/api/users
- **POST:** /v1/api/auth/signin
- **POST:** /v1/api/coins/:coinId/user/:userId

#### Uso de códigos de estado

Los códigos de estado utilizados son:

- **200:** Recurso obtenido correctamente
- **201:** Recurso creado correctamente
- **400:** Error del cliente, algo no permitido por la lógica de negocio
- **401:** Error de identificación, falta de autenticación
- **403:** Error de autorización, falta de privilegios
- **404:** Recurso no encontrado, no existe dicho recurso

#### Manejo de errores

El manejo de errores se especifíca por medio de dos atributos:

- **status:** Código de estado que caracteriza el error que se ha lanzado

- **message:** Cadena de texto con una descripción o explicación de lo ocurrido, también puede ser un objeto que contenga la metadata de las validaciones por campos

#### Autenticación sin estado

La autenticación sin estado se maneja mediante los **JWT** para la generación de dos credenciales utilizando la biblioteca **jsonwebtoken**.

- **id_token:** Permite al usuario acceder a rutas privadas pero **no protegidas**. De esa manera el cliente sabe que usuario está accediendo a las rutas privadas.

- **refresh_token:** Permite al cliente realizar la llamada autenticación silenciosa, sin que el usuario deba volver a iniciar sesión de la forma original. También se utiliza el mecanismo de rotación de token de actualización cuando en el entorno del cliente no es posible almacenar de forma segura el token. [En este repositorio](https://github.com/FredyCorts7/api_component_thesis) se realiza una investigación de mecanismos de autenticación y autorización, por ende se realiza una implementación básica del algoritmo ***refresh token rotation***.

Los tokens se definen con un tiempo de expiración, por lo que depende de la seguridad con los que puedan ser guardados.

Para este proyecto se definió de la siguiente manera:

- **id_token:** 10 minutos
- **refresh_token:** 15 minutos

#### Validación de datos

Los contratos como objetos de transferencia de datos (DTO's) son fundamentales para tratar lo requerido en cada endpoint o firma implementada. Si bien es cierto, TypeScript es una buena opción para implementar interfaces que permitan eso, en este proyecto se simulan unos DTO's con los schemas de validación que proporciona la biblioteca ***express-validator***.

#### Pruebas automatizadas

Las pruebas automatizadas nos permiten seguir construyendo de forma segura, por lo que tambien es bueno tratar de abarcar lo que más que se pueda los tipos de prueba. Para este proyecto se realizan:

- **Unitarias:** Mediante la biblioteca Jest que ha ido tomando una excelente acojida en el ecosistema de JavaScript.

- **Integración** Mediante la biblioteca SuperTest junto con Jest para probar endpoints completamente desde su llamado.
