import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "./Data";

let id = 4;
function getId() {
    return id++;
}
function TodoListCard() {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [inputValue, setInputValue] = useState("");
    /*
        useSetRecoilState : 새로운 아이템을 생성하기 위해
        todoListState 내용을 업데이트 하는
        setter 함수에 접근해야한다.
        컴포넌트에서 setter함수를 얻기 위해 사용한다.
        useRecoilState : atom혹은 selector의 값을 읽고 쓰려고 할때 사용
        useState와 비슷한 형태로 생겼다.
        기본값 대신 recoil의 상태로 인자를 받는다.
        상태가 업데이트 되면 자동적으로 리렌더링이 일어난다.
        useRecoilState는 기능을 반으로 분리 할 수 있다.
        const todoList = useRecoilValue(todolistState)
        : recoil의 상태값을 반환한다.
        상태를 읽을 수만 있게 하고 싶을 때 사용
        const setTodoList = useSetRecoilState(todoListState);
        : recoil 상태의 값을 업데이트하기 위한 setter 함수를 반환
    */
    const onChange = (event) => {
        setInputValue(event.target.value);
        console.log(inputValue);
    };
    const onCreate = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            alert("공백은 입력할 수 없습니다.");
        } else {
            const item = {
                id: getId(),
                text: inputValue,
                done: false,
            };
            setTodoList((olditem) => [...olditem, item]);
        }
        setInputValue("");
        console.log(todoList);
    };

    const onDelete = (deleteid) => {
        console.log(deleteid);
        // setTodoList(todoList.filter((_, index) => index !== deleteid)); // 항목 삭제
        // setTodoList(todoList.filter((item) => item.id !== id));
        const newTodoList = todoList.filter((item) => item.id !== deleteid);
        setTodoList(newTodoList);
    };
    return (
        <>
            <form onSubmit={onCreate}>
                <input
                    type="text"
                    placeholder="할 일을 입력 후 add"
                    onChange={onChange}
                    value={inputValue}
                />
                <button onClick={onCreate}>Add</button>
            </form>
            <p>List</p>

            {todoList.map((item) => (
                <div key={item.id}>
                    <p>
                        {item.text}
                        <button onClick={() => onDelete(item.id)}>Delete</button>
                    </p>
                </div>
            ))}
        </>
    );
}

export default TodoListCard;
// React에서 event.target.value는 정해져있는것인가?
/*
<정리>
- <input value={변수명}/>
    value : input 태그의 속성
    변수명 : input태그에서 입력한 값을 삽입하는 변수

event.target.value
: input에 있는 고유한 것
event.target : onChange에서의 인자값에 있는 내장된 것

- 구조분해를 하는 이유
const onChange = (event) => {
	const {value} = event.target; // 구조분해
	setInputValue(value);
	console.log(inputvalue);
}

가독성이 높아진다.

구조분해 : (event.target.value) === (const {value} = event.target;)
구조분해 : 구조를 하나씩 푸는 느낌
* 모르면 콘솔로그 찍어보기
함수에서 첫번째 인자값에는 target 객체가 담겨있는 객체가 온다.
event 객체 안에 많은 객체가 있다.
*/
