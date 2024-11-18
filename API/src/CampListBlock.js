import { Link } from "react-router-dom";
import "./index.css";

function CampListBlock({ campData }) {
    console.log("##campgroundInfo", campData);
    return (
        <>
            <ol>
                {campData &&
                    campData.map((item, index) => (
                        <li key={index}>
                            <Link to={`/campinfo/${item.contentId}`} state={{ item }}>
                                <img src={item.firstImageUrl} />
                                {item.facltNm}
                            </Link>
                        </li>
                    ))}
            </ol>
        </>
    );
}

export default CampListBlock;
