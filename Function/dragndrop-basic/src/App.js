import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";

const inite = {
    squadName: "Super hero squad",
    homeTown: "Metro City",
    formed: 2016,
    secretBase: "Super tower",
    active: true,
    members: [
        {
            name: "Molecule Man",
            index: 0,
            age: 29,
            secretIdentity: "Dan Jukes",
            powers: ["Radiation resistance", "Turning tiny", "Radiation blast"],
        },
        {
            name: "Madame Uppercut",
            index: 1,
            age: 39,
            secretIdentity: "Jane Wilson",
            powers: ["Million tonne punch", "Damage resistance", "Superhuman reflexes"],
        },
        {
            name: "Eternal Flame",
            index: 2,
            age: 1000000,
            secretIdentity: "Unknown",
            powers: [
                "Immortality",
                "Heat Immunity",
                "Inferno",
                "Teleportation",
                "Interdimensional travel",
            ],
        },
        {
            name: "모각코",
            index: 3,
            age: 1000000,
            secretIdentity: "Unknown",
            powers: [
                "Immortality",
                "Heat Immunity",
                "Inferno",
                "Teleportation",
                "Interdimensional travel",
            ],
        },
        {
            name: "이름",
            index: 4,
            age: 1000000,
            secretIdentity: "Unknown",
            powers: [
                "Immortality",
                "Heat Immunity",
                "Inferno",
                "Teleportation",
                "Interdimensional travel",
            ],
        },
    ],
};

function App() {
    const [isShow, setIsShow] = useState(false);
    const [members, setMembers] = useState(inite.members); // 드래그할 데이터

    const onShow = () => {
        setIsShow(!isShow);
    };

    // 드래그가 끝났을 때 순서를 변경하는 함수
    const handleOnDragEnd = (result) => {
        console.log(result);
        if (!result.destination) {
            console.log("목적지");
            return;
        } // 목적지가 없으면 종료

        const items = Array.from(members); // 기존 배열 복사
        const [reorderedItem] = items.splice(result.source.index, 1); // 드래그한 아이템 삭제
        items.splice(result.destination.index, 0, reorderedItem); // 새 위치에 아이템 삽입

        setMembers(items); // 상태 업데이트
    };

    return (
        <>
            <button onClick={onShow}>목록보기</button>
            {isShow && (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="members">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {members.map((member, index) => (
                                    <Draggable
                                        key={member.index}
                                        draggableId={member.name}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    userSelect: "none",
                                                    padding: "16px",
                                                    margin: "4px",
                                                    backgroundColor: "#f4f4f4",
                                                    border: "1px solid #ccc",
                                                    ...provided.draggableProps.style,
                                                }}
                                            >
                                                <p>{member.name}</p>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </>
    );
}

export default App;
