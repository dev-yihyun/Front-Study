import { initializeApp } from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc,
    Timestamp,
} from "firebase/firestore";
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

// 모든 데이터 가져오기
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

// import { doc, setDoc } from "firebase/firestore";
type AddItem = {
    title: string;
    content: string;
};
export async function addItem({ title, content }: AddItem) {
    const newItemRef = doc(collection(db, "board"));
    const createAtTimeStamp = Timestamp.fromDate(new Date());
    const newItem = {
        id: newItemRef.id,
        title: title,
        content: content,
        createAt: createAtTimeStamp,
    };
    await setDoc(newItemRef, newItem);
    return newItem;
}

// import {doc,getDoc} from "firebase/firestore"

// 단일 데이터 조회
// http://localhost:3000/api/board/id값
export async function fetchSinglelData(id: string) {
    if (id === null) {
        return null;
    }

    const fetchDataDocRef = doc(db, "board", id);
    const fetchDataDocSnap = await getDoc(fetchDataDocRef);
    if (fetchDataDocSnap.exists()) {
        console.log("Document Data : ", fetchDataDocSnap.data());
        const fetchedData: BoardItem = {
            id: fetchDataDocSnap.id,
            title: fetchDataDocSnap.data()["title"],
            content: fetchDataDocSnap.data()["content"],
            createAt: fetchDataDocSnap.data()["createAt"].toDate(),
        };
        return fetchedData;
    } else {
        console.log("No Such Document!");
        return null;
    }
}
