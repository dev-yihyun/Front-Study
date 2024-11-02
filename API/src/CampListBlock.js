import "./index.css";

function CampListBlock({ campgroundInfo }) {
    return (
        <>
            <ol>
                {campgroundInfo &&
                    campgroundInfo.map((item, index) => (
                        <li key={index}>
                            <img src={item.firstImageUrl} />
                            {item.facltNm}
                        </li>
                    ))}
            </ol>
        </>
    );
}

export default CampListBlock;
// 구조분해할당 campgroundInfo를 배열로 받지 못해서 map을 호출 할 때 오류가 발생한다.
// 컴포넌트 함수의 매개변수로 campgroundInfo를 받을때 props로 전달된 전체 객체를 받게된다.
// 그래서 구조분해할당을 통해 배열로 받아 접근해야한다.
