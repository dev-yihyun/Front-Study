import Featuredposts from "@/components/Featuredposts";
import Profile from "@/components/Profile";
import YouMayLike from "@/components/YouMayLike";

export default function Home() {
    return (
        <>
            <Profile />
            <Featuredposts />
            <YouMayLike />
        </>
    );
}
