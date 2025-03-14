export default async function PantsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <h1>{slug} 제품 설명 페이지</h1>;
}
//
/*
url에 한글을 입력하면 %%가 나오는 이유?
URL에서 한글이 깨져 보이는 것은 URL 인코딩된 형태로 전달되어 파싱되었기 때문입니다.
참고로 URL 인코딩은 비 ASCII 문자를 URL 안에서 안전하게 전송하기 위해 해당 문자를 퍼센트 인코딩된 문자열로 변환하는 과정입니다.

https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
*/
