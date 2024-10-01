import React from "react";
import { useRecoilValue } from "recoil";
import {todoListState} from './TodoState';
import TodoItemCreator from "./TodoItemCreator ";
import TodoItem from "./TodoItem";

function TodoList() {
    const todoList = useRecoilValue(todoListState);
  
    return (
      <>
        {/* <TodoListStats /> */}
        {/* <TodoListFilters /> */}
        <TodoItemCreator />
  
        {todoList.map((todoItem) => (
          <TodoItem key={todoItem.id} item={todoItem} />
        ))}
      </>
    );
}

export default TodoList;