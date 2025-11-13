"use client";
import React, { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  const API = `${HTTP_SERVER}/lab5/todos`;

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      <h4>Retrieving Arrays</h4>
      <a href={API} className="btn btn-primary mb-2" id="wd-retrieve-todos" target="_blank">
        Get Todos
      </a>
      <hr />

      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        type="text"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        className="form-control w-50 mb-2"
        id="wd-todo-id"
      />
      <a
        href={`${API}/${todo.id}`}
        className="btn btn-primary mb-2"
        id="wd-retrieve-todo-by-id"
        target="_blank"
      >
        Get Todo by ID
      </a>
      <hr />

      <h4>Filtering Array Items</h4>
      <a
        href={`${API}?completed=true`}
        className="btn btn-primary mb-2"
        id="wd-retrieve-completed-todos"
        target="_blank"
      >
        Get Completed Todos
      </a>
      <hr />

      <h4>Creating new Items in an Array</h4>
      <a
        href={`${API}/create`}
        className="btn btn-primary mb-2"
        id="wd-create-todo"
        target="_blank"
      >
        Create Todo
      </a>
      <hr />

      <h4>Deleting from an Array</h4>
      <input
        type="text"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        className="form-control w-50 mb-2"
      />
      <a
        href={`${API}/${todo.id}/delete`}
        className="btn btn-danger mb-2"
        id="wd-delete-todo"
        target="_blank"
      >
        Delete Todo with ID = {todo.id}
      </a>
      <hr />

      <h4>Updating an Item in an Array</h4>
      <input
        type="text"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        className="form-control w-25 mb-2"
        id="wd-update-todo-id"
      />
      <input
        type="text"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        className="form-control w-75 mb-2"
        id="wd-update-todo-title"
      />
      <a
        href={`${API}/${todo.id}/title/${todo.title}`}
        className="btn btn-primary mb-2"
        id="wd-update-todo"
        target="_blank"
      >
        Update Todo
      </a>
      <hr />

      <input
        type="text"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        className="form-control w-75 mb-2"
        placeholder="Description"
      />
      <a
        href={`${API}/${todo.id}/description/${todo.description}`}
        className="btn btn-primary mb-2 me-2"
        id="wd-update-todo-description"
        target="_blank"
      >
        Update Description
      </a>

      <div className="form-check mb-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
          className="form-check-input"
          id="wd-todo-completed"
        />
        <label className="form-check-label" htmlFor="wd-todo-completed">
          Completed
        </label>
      </div>
      <a
        href={`${API}/${todo.id}/completed/${todo.completed}`}
        className="btn btn-primary mb-2"
        id="wd-update-todo-completed"
        target="_blank"
      >
        Update Completed Status
      </a>
    </div>
  );
}