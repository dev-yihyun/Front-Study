import os from "os";
import { useState } from "react";

export default function Home() {
    console.log("test");
    console.log(os.hostname());
    const [name, setName] = useState("");
    return <h1>홈페이지다~!</h1>;
}
