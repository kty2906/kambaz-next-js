# Lab 5 - RESTful Web APIs with Express.js

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root of your project with:

```
NEXT_PUBLIC_HTTP_SERVER=http://localhost:4000
```

**Note:** Since this is a Next.js project, use `NEXT_PUBLIC_` prefix instead of `VITE_`. The code will automatically handle both prefixes.

### 2. Node.js Server Setup

You need to create a separate Node.js Express server. The server should be in a sibling directory (not inside this React project).

1. Create a new directory for the server (e.g., `kambaz-node-server-app`)
2. Initialize it with `npm init`
3. Install Express: `npm install express`
4. Install CORS: `npm install cors`
5. Install nodemon (optional, for auto-restart): `npm install nodemon -g`
6. Create the server routes as described in Chapter 5

### 3. Server Routes Required

The Lab 5 components expect the following server routes:

- `GET /lab5/welcome` - Returns welcome message
- `GET /lab5/add/:a/:b` - Adds two numbers
- `GET /lab5/subtract/:a/:b` - Subtracts two numbers
- `GET /lab5/multiply/:a/:b` - Multiplies two numbers
- `GET /lab5/divide/:a/:b` - Divides two numbers
- `GET /lab5/calculator?operation=...&a=...&b=...` - Calculator with query params
- `GET /lab5/assignment` - Returns assignment object
- `GET /lab5/assignment/title` - Returns assignment title
- `GET /lab5/assignment/title/:newTitle` - Updates assignment title
- `GET /lab5/module` - Returns module object
- `GET /lab5/module/name` - Returns module name
- `GET /lab5/module/name/:newName` - Updates module name
- `GET /lab5/todos` - Returns all todos
- `GET /lab5/todos/:id` - Returns todo by ID
- `GET /lab5/todos?completed=true` - Filters todos by completed status
- `GET /lab5/todos/create` - Creates a new todo
- `GET /lab5/todos/:id/delete` - Deletes a todo (old method)
- `GET /lab5/todos/:id/title/:title` - Updates todo title
- `POST /lab5/todos` - Creates a new todo (with body)
- `PUT /lab5/todos/:id` - Updates a todo (with body)
- `DELETE /lab5/todos/:id` - Deletes a todo

### 4. CORS Configuration

Make sure your server has CORS enabled to allow requests from the React app:

```javascript
import cors from 'cors';
app.use(cors());
```

### 5. Testing

1. Start your Node.js server on port 4000
2. Start your Next.js app: `npm run dev`
3. Navigate to `/Labs/Lab5` to see all the exercises


