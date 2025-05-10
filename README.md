# WorkGam-Client

**WorkGam-Client** es el frontend de una aplicación de gestión de trámites y gamificación en el trabajo. Está diseñado utilizando **React.js** y proporciona una interfaz interactiva para que los usuarios gestionen sus tareas, perfiles y procedimientos.

## Funcionalidades Clave

- 🎮 **Gamificación**: Motiva a los empleados a través de puntos, rankings y recompensas.
- 🔒 **Autenticación de Usuarios**: Acceso seguro utilizando JWT.
- ⚡ **Notificaciones en Tiempo Real**: Con Socket.IO para recibir actualizaciones instantáneas.
- ✅ **Gestión de Tareas**: Los empleados gestionan tareas de acuerdo con su carga de trabajo y puntos.
- 🔑 **Roles y Permisos**: Gestión de acceso según el rol del usuario (Administrador, Empleado, Cliente).

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

1. **`src/`**: Este es el directorio principal donde reside todo el código fuente de la aplicación.
   
2. **`components/`**: Contiene todos los componentes reutilizables de la interfaz de usuario (UI), organizados por su funcionalidad.
   
3. **`context/`**: Aquí se gestionan los estados globales utilizando la React Context API para propagar datos como la autenticación y las notificaciones.

4. **`pages/`**: Contiene las páginas principales que agrupan varios componentes. Estas páginas corresponden a las vistas que ven los usuarios, según su rol (Administrador, Cliente, Empleado).
   
5. **`services/`**: Los servicios son responsables de interactuar con la API backend y manejar las solicitudes HTTP.
   
6. **`store/`**: Almacena el estado global utilizando **zustand** o **Redux** para gestionar datos de la aplicación de manera centralizada.

7. **`App.jsx`**: El componente raíz de la aplicación que maneja la configuración general, incluyendo las rutas de la aplicación.
   
8. **`index.css`**: Contiene los estilos globales que se aplican a toda la aplicación.

9. **`routes.jsx`**: Define las rutas para la navegación dentro de la aplicación, especificando qué componente se muestra según la URL.


## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/PabloMedinaMoreno/WorkGam-Client
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd WorkGam-Client
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Inicia la aplicación:

    ```bash
    npm start
    ```

## Requisitos

- **Node.js**: Asegúrate de tener instalada una versión compatible de Node.js.
- **Navegador compatible**: La aplicación es completamente funcional en la mayoría de los navegadores modernos.

## Páginas Principales

### 1. Iniciar Sesión

La página de inicio de sesión permite a los usuarios ingresar sus credenciales para acceder a la plataforma. Dependiendo del rol, el sistema redirige al usuario a la página correspondiente (Administrador, Empleado o Cliente). Esta página utiliza un formulario de autenticación sencillo.

![Página de Inicio de Sesión](path_to_image_login.png)

### 2. Clientes Adjuntar Documentación

En esta página, los clientes pueden adjuntar los documentos necesarios para sus trámites. El formulario permite cargar múltiples documentos, y el sistema realiza validaciones antes de permitir el envío. Una vez enviados, los documentos se asignan a las tareas correspondientes.

![Página de Clientes para Adjuntar Documentación](path_to_image_client_upload.png)

### 3. Trabajadores Completar Tareas

Los trabajadores pueden visualizar las tareas asignadas en esta página. Aquí tienen la posibilidad de revisar los documentos adjuntados, completarlas o rechazarlas, así como proporcionar retroalimentación al cliente. El sistema también les muestra su desempeño en tiempo real con base en los puntos ganados por cada tarea.

![Página de Trabajadores para Completar Tareas](path_to_image_worker_tasks.png)

### 4. Ranking Gamificación

Esta página muestra el ranking de los empleados basado en los puntos obtenidos a través de la gamificación. Los empleados pueden ver su posición en el ranking, lo que motiva a completar más tareas y ganar puntos. El sistema permite a los trabajadores compararse con sus compañeros y esforzarse por mejorar su desempeño.

![Página de Ranking de Gamificación](path_to_image_gamification_ranking.png)

## Funcionalidades Clave

- **Autenticación de usuarios**: A través de la página de inicio de sesión, los usuarios pueden autenticarse con su rol correspondiente.
- **Gamificación**: Los empleados pueden visualizar su progreso y ranking, motivándolos a completar más tareas y mejorar su desempeño.
- **Gestión de tareas**: Los empleados gestionan las tareas asignadas, mientras que los clientes cargan documentos para sus trámites.
- **Notificaciones en tiempo real**: A través de **Socket.IO**, los usuarios reciben actualizaciones instantáneas sobre tareas, asignaciones y cambios en sus trámites.
- **Interfaz modular y responsiva**: La interfaz está diseñada para ser accesible desde dispositivos móviles y escritorios, proporcionando una experiencia consistente en todas las plataformas.

## Requisitos del Sistema

El frontend de la aplicación requiere:

- **Node.js** para ejecutar el entorno de desarrollo.
- **React.js** para la creación de componentes y gestión del estado.
- **React Router** para la gestión de rutas.
- **Axios** para realizar solicitudes HTTP al backend.
- **Socket.IO-client** para la comunicación en tiempo real.
- **Zustand** para el manejo del estado global.

Para instalar las dependencias, ejecute el siguiente comando:

```bash
npm install
```