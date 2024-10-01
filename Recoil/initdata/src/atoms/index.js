import { atom } from "recoil";

export const userDataSetState = atom({
    key: "userDataSetState", // 고유 key
    default: [
        {
            id: "user1",
            email: "user1@example.com",
            phone: "010-1234-5678",
            nickname: "UserOne",
            value: 0,
        },
        {
            id: "user2",
            email: "user2@example.com",
            phone: "010-2345-6789",
            nickname: "UserTwo",
            value: 0,
        },
        {
            id: "user3",
            email: "user3@example.com",
            phone: "010-3456-7890",
            nickname: "UserThree",
            value: 0,
        },
    ],
});
