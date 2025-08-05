# 💡Keep Clone

<div align="center">

![React Badge](https://img.shields.io/badge/React-58c4dc?logo=react&logoColor=fff&)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=fff&)
![Tanstack Query Badge](https://img.shields.io/badge/Tanstack_Query-ef4444?logo=reactquery&logoColor=fff&)
![Axios Badge](https://img.shields.io/badge/Axios-671ddf?logo=axios&logoColor=fff&)

![Node.js Badge](https://img.shields.io/badge/Node.js-417e38?logo=node.js&logoColor=fff&)
![Express Badge](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&)
![mongoose Badge](https://img.shields.io/badge/mongoose-800?logo=mongoose&logoColor=fff&)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-00684a?logo=mongodb&logoColor=fff&)

</div>

## Project Features

- Keep clone (To-Do) application with React frontend and Node.js/Express backend.
- Allows you to create, edit, and delete tasks and subtasks.
- Data synchronization with a MongoDB database.
- Real-time update of task status.
- Clear separation between frontend and backend for easier development and maintenance.

## Improvements

- Add a task by pressing enter in any task
- Deleted a task by backspacing a task without text
- Change a task to a subtask and viceversa
- Drag n' drop to items in the list
- Add new list

## Development Environment Setup

This project contains both backend and frontend applications.

### Prerequisites

- Node.js and npm installed
- Add and .env in the back directory with these variables for your MongoDB:
  DB_USER
  DB_PASSWORD
  DB_HOST
  DB_NAME

### Install dependencies

From the root directory, run:

```
npm install
```

This will install the root development dependencies. You should also install dependencies in the `back` and `front` folders:

```
cd back && npm install
cd ../front && npm install
```

### Run backend and frontend

From the root directory, simply run:

```
npm run dev
```

This will start both the backend and frontend development servers concurrently.

---
