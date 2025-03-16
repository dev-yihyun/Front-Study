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

/*
dynamic router를 사용하는 페이지를 build 했을 때
: slug라는 페이지 자체는 static 하게 만들었다.
페이지에 대한 기본 골격은 서버상에서 pre-rendering html로 만들어 두었다.
브라우저 상에서 skirt를 입력해서 경로에 접근하면 next js 서버 상에서 미리 만들어둔 html에 slug로 들어온 것을 리액트에 prop 형태로 json 형태로 전달해서 필요한 데이터를
채워서 다시 html로 만든 다음에 사용자에게 보내준다.

generateStaticParam을 사용할 때
: 동일하게 미리만들어둔 html페이지에 prop으로 json 형태를 전달하여 html 페이지를 미리 생성해둔다.
products에 명시한것들에 한에서
generateStaticParam을 사용하지 않으면 prop으로 전달해서 다시 데이터를 채우는 html페이지를 만드는 것을
사용자가 요청할때 SSR으로 할지
아님 빌드할때 명시된것을 미리 만들어 둘지의 차이 

products 페이지는 일반적인 SSG 하나의 파일이 아닌 기본 골격을 가지고 있고
거기에 필요한 prop을 받는 컴포넌트 페이지다.

*/
