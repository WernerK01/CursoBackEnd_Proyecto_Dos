## BackEnd Dos :: Login

En este proyecto podrás encontrar un sistema de login y register completamente funcional. 
Así como también esta añadido un sistema de tokens y autentificaciones hechas con JWT.

---

1. Se creó un modelo con MongoDB donde se podrán encontrar todos los datos válidos para un usuario dentro de nuestra web:

   - Nombre, apellido, correo electrónico, contraseña (en formato hash), edad y roles.

2. La contraseña se encripta al momento de registrarse.

3. Se crearon técnicas con Passport para generar un token al momento del login. El token se entregará al cliente y se podrá utilizar para verificar la sesión actual.

4. Se implementó el sistema de JWT para el login.

5. Se implementó la ruta `/api/sessions/current` para validar la sesión actual.

6. Rutas válidas:
   - **POST** `/api/sessions/register`: Envía una petición para dar de alta a un usuario nuevo.
   - **POST** `/api/sessions/login`: Envía una petición para iniciar sesión.
   - **GET** `/api/sessions/current`: Envía una petición para validar la sesión actual.
