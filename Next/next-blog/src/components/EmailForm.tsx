function EmailForm() {
    return (
        <>
            <div className="w-full max-w-md mt-10">
                <form className=" border border-gray-900/10 rounded-md flex justify-center flex flex-col gap-2 items-start p-5">
                    <p>Your Email</p>
                    <input
                        type="email"
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-gray-900/10 rounded-md w-100"
                        placeholder="Your Email"
                        required
                    />
                    <p>Title</p>
                    <input
                        type="text"
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-gray-900/10 rounded-md w-100"
                        placeholder="Title"
                        required
                    />
                    <p>Message</p>
                    <textarea
                        rows={3}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 resize-none"
                        placeholder="Message"
                        required
                    />
                    <div className="flex flex-row gap-2 mt-5 items-center self-end">
                        <button type="button" className="text-sm/6 font-semibold text-gray-900">
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
