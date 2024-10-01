import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import {todoListState} from './TodoState';
import TodoList from "./TodoList";

function CreateEditBlock() {
    const [inputValue, setInputValue] = useState('');
    const setTodoList = useSetRecoilState(todoListState);
  
    const addItem = () => {
      if(inputValue===""){
        alert("공백은 입력할 수 없습니다.")
      }
      else{
        setTodoList((oldTodoList) => [
        ...oldTodoList,
        {
          id: getId(),
          text: inputValue,
          isComplete: false,
        },
      ]);
      setInputValue('');
      }
      
    };
  
    const onChange = ({target: {value}}) => {
      setInputValue(value);
    };
  
    return (
      <div>
        <TodoList itemType="CreateEdit"/>
        
        <input type="text" value={inputValue} onChange={onChange} />
        <button onClick={addItem}>Add</button>
      </div>
    );
}
let id = 3;
function getId() {
    return id++;
}
export default CreateEditBlock;