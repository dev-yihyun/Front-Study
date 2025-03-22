import Link from "next/link";
import { FaBlogger, FaGithub } from "react-icons/fa";
import profileData from "../../../data/profileData.json";
function ContactPage() {
    return (
        <>
            <section className="text-center">
                <h1 className="font-bold text-4xl">Contact Me!</h1>
                <p className="mt-5">{profileData.emails[0]}</p>
                <div className="flex flex-row justify-center items-center mt-10 gap-5">
                    <Link href={profileData.githubUrl}>
                        <FaGithub className="text-6xl" />
                    </Link>
                    <Link href={profileData.blogUrl}>
                        <FaBlogger className="text-6xl" />
                    </Link>
                </div>
                <p className="text-bold text-2xl mt-5">Or send me on email</p>
            </section>
        </>
    );
}

export default ContactPage;
