import "./index.css";

function CampListBlock({ campData }) {
    // console.log("##campgroundInfo", campData);
    return (
        <>
            <ol>
                {campData &&
                    campData.map((item, index) => (
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
