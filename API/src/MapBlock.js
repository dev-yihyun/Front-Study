import { Container as MapDiv, Marker, NaverMap, useNavermaps } from "react-naver-maps";
import "./index.css";
function MapBlock({ mapX, mapY }) {
    const navermaps = useNavermaps();

    if (!navermaps || !mapX || !mapY) {
        return <p>위치를 표시할 수 없습니다.</p>;
    }

    return (
        <>
            <MapDiv
                style={{
                    width: "100%",
                    height: "600px",
                }}
            >
                <NaverMap defaultCenter={new navermaps.LatLng(mapY, mapX)} defaultZoom={15}>
                    <Marker position={new navermaps.LatLng(mapY, mapX)} />
                </NaverMap>
            </MapDiv>
        </>
    );
}

export default MapBlock;
