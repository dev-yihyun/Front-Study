import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, Timestamp } from "firebase/firestore";

type BoardItem = {
    id: string;
    title: string;
    content: string;
    createAt: Timestamp;
};

// Firebase 설정
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 데이터 가져오기
export async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "board"));
    if (querySnapshot.empty) {
        return [];
    }
    const fetchArray: BoardItem[] = [];
    querySnapshot.forEach((doc) => {
        const getData: BoardItem = {
            id: doc.id,
            title: doc.data()["title"],
            content: doc.data()["content"],
            createAt: doc.data()["createAt"].toDate(),
        };
        fetchArray.push(getData);
    });
    return fetchArray;
}
/*
{
  "message": "데이터 가져오기 성공",
  "data": [
    {
      "id": "Aw8dVmNpCFfTVkz2tWqr",
      "title": "여기는 게시글 제목 입니다.",
      "content": "게시글 내용 입니다.",
      "createAt": "2025-05-11T20:56:00.416Z"
    }
  ]
}
*/
