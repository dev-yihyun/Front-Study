import EmailForm from "@/components/EmailForm";
import { Metadata } from "next";
import Link from "next/link";
import { FaBlogger, FaGithub } from "react-icons/fa";
import profileData from "../../../data/profileData.json";
export const metadata: Metadata = {
    title: "Contact Me",
    description: "나에게 메일 보내기기",
};

function ContactPage() {
    return (
        <>
            <section className=" flex flex-col items-center text-center ">
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
                <EmailForm />
            </section>
        </>
    );
}

export default ContactPage;
