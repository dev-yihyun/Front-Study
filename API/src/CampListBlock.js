import { Link } from "react-router-dom";
import "./index.css";

function CampListBlock({ campData }) {
    return (
        <>
            <ol>
                {campData &&
                    campData.map((item, index) => (
                        <li key={index}>
                            <Link to={`/campinfo/${item?.contentId}`} state={{ item }}>
                                <img
                                    src={item?.firstImageUrl}
                                    alt={item?.facltNm || "캠핑장 이미지"}
                                />
                                {item?.facltNm || "캠핑장 이름 정보 없음"}
                            </Link>
                        </li>
                    ))}
            </ol>
        </>
    );
}

export default CampListBlock;
