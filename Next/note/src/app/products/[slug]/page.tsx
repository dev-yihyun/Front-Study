type Props = {
    params: {
        slug: string; //폴더명과 동일하기
    };
};

export default function PantsPage({ params }: Props) {
    return <h1>{params.slug} 제품 설명 페이지</h1>;
}

// 이 함수 이름은 next 규칙이다.
/*
Dynamic Route page 에서 특정한 경로에 한에서는 미리 페이지를 만들어 두고 싶다면 
어떤 경로에 대해서 만들고싶은지 경로를 알려주면 된다.
*/
export function generateStaticParams() {
    //내가 미리 렌더링하고싶은 것
    const products = ["pants", "skirt"];
    // 배열 안에 잇는 product에 대해서 동일하게 prop 형태로 객체를 전달
    // params에 들어가는 형태로 객체를 만들어 주면 된다.
    // 총2개의 slug 객체가 배열로 들어간다.
    return products.map((product) => ({
        slug: product,
    }));
}
