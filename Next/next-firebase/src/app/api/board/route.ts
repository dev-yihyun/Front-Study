import { fetchData } from "@/data/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const fetchedData = await fetchData();
        return NextResponse.json(
            { message: "데이터 가져오기 성공", data: fetchedData },
            { status: 200 }
        );
    } catch (error) {
        console.error("서버 에러:", error);
        return NextResponse.json({ message: "서버 에러", error: String(error) }, { status: 500 });
    }
}
