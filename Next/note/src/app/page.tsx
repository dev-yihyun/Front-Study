import Counter from "@/components/Counter";
import Image from "next/image";

export default function Home() {
    console.log("안녕 - 서버");

    return (
        <>
            <h1>홈페이지다~!</h1>
            <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                alt="shop"
                width={400}
                height={400}
            />
            <Counter />
        </>
    );
}
