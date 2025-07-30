# todo-t1

## Características del proyecto

- Aplicación de lista de tareas (To-Do) con frontend en React y backend en Node.js/Express.
- Permite crear, editar y eliminar tareas y subtareas.
- Soporte para comentarios en tareas.
- Sincronización de datos con una base de datos MongoDB.
- Actualización en tiempo real del estado de las tareas.
- Separación clara entre frontend y backend para facilitar el desarrollo y mantenimiento.

## Configuración del entorno de desarrollo

Este proyecto contiene aplicaciones tanto de backend como de frontend.

### Requisitos previos

- Node.js y npm instalados

### Instalar dependencias

Desde el directorio raíz, ejecuta:

```
npm install
```

Esto instalará las dependencias de desarrollo del directorio raíz. También debes instalar las dependencias en las carpetas `back` y `front`:

```
cd back && npm install
cd ../front && npm install
```

### Ejecutar backend y frontend

Desde el directorio raíz, simplemente ejecuta:

```
npm run dev
```

This will start both the backend and frontend development servers concurrently.

---
