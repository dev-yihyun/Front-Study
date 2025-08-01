"use client";

import { useState } from "react";
import Modal from "./TestModal";
function Test() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
            >
                모달 열기
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold mb-4">모달 제목</h2>
                <p className="mb-4">여기는 모달 내용입니다.</p>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    닫기
                </button>
            </Modal>
        </div>
    );
}

export default Test;
