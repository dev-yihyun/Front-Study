import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const initialTitles = [
    { id: "1", title: "리액트" },
    { id: "2", title: "자바스크립트" },
    { id: "3", title: "파이썬" },
    { id: "4", title: "데이터베이스" },
    { id: "5", title: "알고리즘" },
    { id: "6", title: "자료구조" },
    { id: "7", title: "운영체제" },
];

const App = () => {
    const [addedTitles, setAddedTitles] = useState([]);
    const [availableTitles, setAvailableTitles] = useState(initialTitles);
    const [savedTitles, setSavedTitles] = useState([]); // 저장된 제목
    const [isEditDisabled, setIsEditDisabled] = useState(true);
    const [isListVisible, setIsListVisible] = useState(false);

    // 목록 보기 버튼 클릭 시 호출되는 함수
    const toggleListVisibility = () => {
        if (isListVisible) {
            // 목록 숨기기를 누를 때, 저장된 목록으로 되돌리기
            setAddedTitles(savedTitles);
            setAvailableTitles(
                initialTitles.filter((title) => !savedTitles.some((saved) => saved.id === title.id))
            );
        }
        setIsListVisible(!isListVisible);
    };

    // 드래그앤드롭이 끝났을 때 호출되는 함수
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(addedTitles);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setAddedTitles(items);
        checkIfEditDisabled(items);
    };

    // 추가/삭제/드래그 시 수정 버튼 활성화 여부를 체크하는 함수
    const checkIfEditDisabled = (newAddedTitles) => {
        // 현재 추가된 제목 목록과 저장된 제목 목록이 같으면 수정 버튼 비활성화
        const isSameAsSaved = JSON.stringify(newAddedTitles) === JSON.stringify(savedTitles);
        setIsEditDisabled(isSameAsSaved);
    };

    // 추가 버튼을 클릭했을 때 호출되는 함수
    const addTitle = (title) => {
        if (addedTitles.length >= 7) return;
        const newAvailableTitles = availableTitles.filter((t) => t.id !== title.id);
        const newAddedTitles = [...addedTitles, title];
        setAvailableTitles(newAvailableTitles);
        setAddedTitles(newAddedTitles);
        checkIfEditDisabled(newAddedTitles); // 상태 체크
    };

    // 삭제 버튼을 클릭했을 때 호출되는 함수
    const removeTitle = (title) => {
        if (addedTitles.length === 1) {
            alert("최소 1개는 선택해야 합니다.");
            return;
        }
        const newAddedTitles = addedTitles.filter((t) => t.id !== title.id);
        setAddedTitles(newAddedTitles);
        setAvailableTitles([...availableTitles, title]);
        checkIfEditDisabled(newAddedTitles); // 상태 체크
    };

    // 수정 버튼을 클릭했을 때 호출되는 함수
    const saveTitles = () => {
        setSavedTitles(addedTitles); // 현재 추가된 제목을 저장
        alert("목록이 저장되었습니다.");
        setIsEditDisabled(true); // 수정 버튼 비활성화
    };

    // 페이지 첫 로드 또는 초기 상태로 돌아갔을 때 추가/삭제 상태를 체크
    useEffect(() => {
        checkIfEditDisabled(addedTitles);
    }, [savedTitles, addedTitles]);

    return (
        <div>
            <button onClick={toggleListVisibility}>
                {isListVisible ? "목록 숨기기" : "목록 보기"}
            </button>

            {isListVisible && (
                <>
                    <h1>추가한 제목</h1>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="addedTitles">
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef}>
                                    {addedTitles.map((title, index) => (
                                        <Draggable
                                            key={title.id}
                                            draggableId={title.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {title.title}
                                                    <button onClick={() => removeTitle(title)}>
                                                        삭제
                                                    </button>
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <h1>추가 가능한 제목</h1>
                    <ul>
                        {availableTitles.map((title) => (
                            <li key={title.id}>
                                {title.title}
                                <button onClick={() => addTitle(title)}>추가</button>
                            </li>
                        ))}
                    </ul>

                    <button disabled={isEditDisabled} onClick={saveTitles}>
                        수정
                    </button>
                </>
            )}
        </div>
    );
};

export default App;
