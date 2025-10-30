"use client"
import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { Lab4State, Todo } from "../../store/types";

export default function TodoList() {
  const { todos } = useSelector((state: Lab4State) => state.todosReducer);
  
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr/>
    </div>
  );
}
