import React from "react";
import { useRecoilValue } from "recoil";
import { filteredTodoListState, todoListState } from "./TodoState";
import TodoItem from "./TodoItem";

function TodoList({itemType}) {
  const todoList = useRecoilValue(filteredTodoListState);

  return(<>
    {
      todoList.map((todoItem) => (
        <div key={todoItem.id} >
          <TodoItem 
            key={todoItem.id} 
            item={todoItem} 
            itemType={itemType}
          />
        </div>
      ))
    }
  </>)
}

export default TodoList;