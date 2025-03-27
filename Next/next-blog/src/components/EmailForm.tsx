"use client";

import { sendContactEmail } from "@/service/contact";
import { ChangeEvent, FormEvent, useState } from "react";
import Banner, { BannerData } from "./Banner";

type Form = {
    from: string;
    subject: string;
    message: string;
};

const DEFAULT_DATA = {
    from: "",
    subject: "",
    message: "",
};

function EmailForm() {
    const [form, setForm] = useState<Form>(DEFAULT_DATA);
    const [banner, setBanner] = useState<BannerData | null>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendContactEmail(form) //
            .then(() => {
                setBanner({
                    message: "메일을 성공적으로 보냈습니다.",
                    state: "success",
                });
                setForm(DEFAULT_DATA);
            })
            .catch((error) => {
                console.error(error);
                setBanner({
                    message: "메일전송에 실패했습니다. 다시 시도해 주세요",
                    state: "error",
                });
            })
            .finally(() => {
                setTimeout(() => {
                    setBanner(null);
                }, 3000);
            });
    };

    const onCancel = () => {
        setForm(DEFAULT_DATA);
    };

    return (
        <>
            <div className="w-full max-w-md mt-10">
                {banner && <Banner banner={banner} />}
                <form
                    className=" border border-gray-900/10 rounded-md flex justify-center flex flex-col gap-2 items-start p-5"
                    onSubmit={onSubmit}
                >
                    <p>Your Email</p>
                    <input
                        type="email"
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-gray-900/10 rounded-md w-100"
                        placeholder="Your Email"
                        name="from"
                        required
                        autoFocus
                        value={form.from}
                        onChange={onChange}
                    />
                    <p>Title</p>
                    <input
                        type="text"
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-gray-900/10 rounded-md w-100"
                        placeholder="Title"
                        required
                        name="subject"
                        value={form.subject}
                        onChange={onChange}
                    />
                    <p>Message</p>
                    <textarea
                        rows={3}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 resize-none"
                        placeholder="Message"
                        required
                        name="message"
                        value={form.message}
                        onChange={onChange}
                    />
                    <div className="flex flex-row gap-2 mt-5 items-center self-end">
                        <button
                            type="button"
                            className="text-sm/6 font-semibold text-gray-900"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EmailForm;
