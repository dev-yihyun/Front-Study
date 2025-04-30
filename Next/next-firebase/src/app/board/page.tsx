"use client";

import { useEffect, useState } from "react";

type BoardItem = {
    id: string;
    title: string;
    content: string;
    createAt: string;
};

export default function Page() {
    const [boardData, setBoardData] = useState<BoardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchBoard = async () => {
        try {
            const response = await fetch("/api/board");
            const result = await response.json();
            setBoardData(result.data);
        } catch (error) {
            console.error("데이터 불러오기 실패", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBoard();
    }, []);

    if (loading) {
        return <div>로딩중...</div>;
    }

    const onAddData = async () => {
        const sampleData = {
            title: "내용 추가 후 수정할 예정입니다.",
            content: "이것은 수정 될 콘텐츠입니다",
        };
        try {
            const response = await fetch("/api/board", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sampleData),
            });

            if (!response.ok) {
                throw new Error("추가 요청 실패");
            }

            const result = await response.json();
            console.log("추가된 데이터:", result);

            // 다시 데이터 불러오기
            const newData = await fetch("/api/board").then((res) => res.json());
            setBoardData(newData.data);
        } catch (error) {
            console.error("추가 중 오류 발생:", error);
        }
    };

    const onDeleteData = async (id: string) => {
        try {
            const response = await fetch(`/api/board/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("삭제 실패");

            await fetchBoard();
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
        }
    };
    const onEditData = async (id: string) => {
        const updatedData = {
            title: "수정된 제목입니다",
            content: "이것은 수정된 콘텐츠입니다",
        };

        try {
            const response = await fetch(`/api/board/${id}`, {
                method: "POST", // or PUT if you've set it up that way
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("수정 요청 실패");
            }

            const refreshed = await fetch("/api/board").then((res) => res.json());
            setBoardData(refreshed.data);
        } catch (error) {
            console.error("수정 중 오류 발생:", error);
        }
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">게시판 데이터</h1>
            <ul className="space-y-2">
                {boardData.map((item) => (
                    <li key={item.id} className="border p-2 rounded">
                        <h2 className="text-xl">{item.title}</h2>
                        <p>{item.content}</p>
                        <small>{item.createAt.toLocaleString()}</small>
                        <br />
                        <button
                            onClick={() => onDeleteData(item.id)}
                            className="text-red-600 mt-2 underline"
                        >
                            삭제
                        </button>
                        <button
                            onClick={() => onEditData(item.id)}
                            className="text-blue-600 underline mr-2"
                        >
                            수정
                        </button>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={onAddData}>
                내용 추가
            </button>
        </div>
    );
}
