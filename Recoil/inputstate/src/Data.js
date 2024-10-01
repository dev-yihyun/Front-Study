import { atom } from "recoil";
export const dataState = atom({
    key: "dataState",
    default: [
        {
            id: 1,
            nickname: "닉네임",
            customvalue: "입력한 값",
            unit: "단위",
        },
        {
            id: 2,
            nickname: "닉네임1",
            customvalue: "123",
            unit: "단위",
        },
        {
            id: 3,
            nickname: "닉네임2",
            customvalue: "223",
            unit: "단위",
        },
        {
            id: 4,
            nickname: "닉네임3",
            customvalue: "335",
            unit: "단위",
        },
    ],
});

export const selectDataState = atom({
    key: "selectDataState",
    default: {
        id: "",
        nickname: "",
        customvalue: "",
        unit: "단위",
    },
});
