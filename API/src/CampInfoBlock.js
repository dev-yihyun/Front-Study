import { useLocation } from "react-router-dom";
import MapBlock from "./MapBlock";

function CampInfoBlock() {
    const location = useLocation();
    const campData = location?.state?.item;
    if (!campData) {
        return <p>캠핑장의 정보를 불러올 수 없습니다.</p>;
    }
    return (
        <>
            {campData?.firstImageUrl ? (
                <img src={campData?.firstImageUrl} alt={campData?.facltNm || "캠핑장 이미지"} />
            ) : (
                <p>이미지를 불러올 수 없습니다.</p>
            )}
            <p>{campData?.facltNm || "캠핑장 이름 정보 없음"}</p>
            <p>주소 : {campData?.addr1 || "정보 없음"}</p>
            <p>전화 : {campData?.tel || "정보 없음"}</p>
            <p>애완동물 출입 : {campData?.animalCmgCl || "정보 없음"}</p>
            <p>
                홈페이지 :
                {campData?.homepage ? (
                    <a
                        href={
                            campData?.homepage.startsWith("http")
                                ? campData?.homepage
                                : `http://${campData?.homepage}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {campData?.homepage}
                    </a>
                ) : (
                    "정보 없음"
                )}
            </p>
            {campData?.resveCl && campData?.resveUrl ? (
                <p>
                    {campData?.resveCl}:
                    <a
                        href={
                            campData?.resveUrl.startsWith("http")
                                ? campData?.resveUrl
                                : `http://${campData?.resveUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {campData?.resveUrl}
                    </a>
                </p>
            ) : null}

            <p> 한줄 소개 : {campData?.lineIntro || "한줄 소개 정보 없음"}</p>
            <p> 소개 :{campData?.intro || "정보 없음"} </p>
            <p>특징 : {campData?.featureNm || "정보 없음"}</p>
            <p>업종 : {campData?.induty || "정보 없음"}</p>
            <p>입지 구분 : {campData?.lctCl || "정보 없음"}</p>
            <p>부대시설 : {campData?.sbrsCl || "정보 없음"}</p>
            <p>운영 기간 : {campData?.operPdCl || "정보 없음"}</p>
            <p>운영 일 : {campData?.operDeCl || "정보 없음"}</p>
            <p>주변 이용 가능 시설 : {campData?.posblFcltyCl || "정보 없음"}</p>
            <p> 태마환경 : {campData?.themaEnvrnCl || "정보 없음"}</p>
            <MapBlock mapX={campData.mapX} mapY={campData.mapY} />
        </>
    );
}

export default CampInfoBlock;
