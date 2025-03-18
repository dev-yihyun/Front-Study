import os from "os";

export default function Home() {
    // 서버 컴포넌트트
    console.log("test");
    console.log(os.hostname());
    // const [name, setName] = useState("");// 컴파일 에러 발생
    // useState는 클라이언트 컴포넌트에서만 사용할 수 있다.

    return <h1>홈페이지다~!</h1>;
}
