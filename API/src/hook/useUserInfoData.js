import { useQuery } from "react-query";

export const useUserInfoData = (userID) => {
    return useQuery(
        ["userInfo", userID],
        () =>
            fetch("http://localhost:3001/mypage", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ userID }),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 요청 실패: ${res.status}`);
                }
                return res.json();
            }),
        {
            enabled: !!userID,
            staleTime: 5 * 60 * 1000,
        }
    );
};
