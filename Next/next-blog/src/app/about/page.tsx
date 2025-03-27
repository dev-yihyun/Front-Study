import Profile from "@/components/Profile";
import { Metadata } from "next";
import profileData from "../../../data/profileData.json";
export const metadata: Metadata = {
    title: "About Me",
    description: "나의 Career",
};

function AboutPage() {
    return (
        <>
            <Profile />
            <section className="text-center bg-indigo-50 rounded-md mt-10 p-8 flex justify-around flex-wrap gap-10 mb-10">
                <div className="flex flex-col justify-around gap-10">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="font-bold text-4xl">Who am I?</h1>
                        <ul className="text-left mt-10">
                            {profileData.introduce.map((item, index) => (
                                <li key={index} className="mt-2">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h1 className="font-bold text-4xl">Major</h1>
                        <p className="mt-4">Computer Science</p>
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    <div>
                        <h1 className="font-bold text-4xl">Career</h1>
                        <p className="mt-4">{profileData.career}</p>
                    </div>
                    <div>
                        <h1 className="font-bold text-4xl">Skills</h1>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <ul>
                                    {profileData.skill
                                        .slice(0, Math.ceil(profileData.skill.length / 2))
                                        .map((item, index) => (
                                            <li key={index} className="mt-2">
                                                {item}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    {profileData.skill
                                        .slice(Math.ceil(profileData.skill.length / 2))
                                        .map((item, index) => (
                                            <li key={index} className="mt-2">
                                                {item}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutPage;
