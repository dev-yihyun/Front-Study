import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "./TodoState";
import { MdDelete, MdDone } from "react-icons/md";
import styled,{css} from "styled-components";

export const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 18px;
  border: 2px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  color:#AAD7D9;
  background-color:white;
  ${(props) =>
    props.$isComplete ?
    css`
      border: 2px solid #38d9a9;
      color: #38d9a9;
    `:null}
`
export const Text = styled.div`
  font-size: 21px;
  color: black;
  font-weight: bolder;
  ${props => props.$isComplete?
    css`
    color:#a09f9c
    `
    :null
  }
`
export const Remove = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  cursor: pointer;
  color: #95badf;
`

function TodoItem({ item,itemType }){
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };

  const editItemText = ({target: {value}}) => {
    if(value===""){
      alert("공백은 입력할 수 없습니다.")
    }else{
          const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
    }

  };

  return(
    <div className="Item" key={item.id}>
      <CheckCircle 
        checked={item.isComplete}
        onClick={ toggleItemCompletion }
       >
        {item.isComplete ? (<MdDone />) : null}
      </CheckCircle>
      {
        itemType==="CreateEdit"?
        <input type="text" value={item.text} onChange={editItemText} />
        :
        <div className="TextBlock">
          <Text $isComplete={item.isComplete}>{item.text}</Text>
        </div>
      }

      
      {
        itemType==="Delete"?
        <Remove onClick={deleteItem}><MdDelete/></Remove>
        :null
      }
    </div>

  )
}
function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
  
function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
export default TodoItem;