import Image from "next/image";
import Link from "next/link";
import profileImage from "../../public/images/profile.png";

function Profile() {
    return (
        <>
            <section className="text-center ">
                <Image
                    src={profileImage}
                    alt="profileImage"
                    width={250}
                    height={250}
                    className="bg-sky-100 rounded-full mx-auto"
                />
                <h1 className="font-bold mt-10 text-3xl">Hi! I'm Yi-Hyun</h1>
                <p className="mt-5 font-bold text-xl">Frontend Developer</p>
                <p className="mt-5">끊임없이 성장하기 위해 노력합니다.</p>
                <Link href="/contact">
                    <button className="mt-5 bg-yellow-100 py-2 px-5 font-bold rounded-xl">
                        Contact Me
                    </button>
                </Link>
            </section>
        </>
    );
}

export default Profile;
