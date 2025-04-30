import { fetchSinglelData } from "@/data/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    const fetchedData = await fetchSinglelData(params.slug);
    if (fetchedData === null) {
        return new Response(null, { status: 204 });
    }
    const response = {
        message: "단일 할일 가져오기 성공",
        data: fetchedData,
    };

    return NextResponse.json(response, { status: 200 });
}
