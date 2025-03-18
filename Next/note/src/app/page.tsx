import Counter from "@/components/Counter";
import os from "os";

export default function Home() {
    console.log("test");
    console.log(os.hostname());

    return (
        <>
            <h1>홈페이지다~!</h1>
            <Counter />
        </>
    );
}
