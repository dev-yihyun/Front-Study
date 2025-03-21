import Link from "next/link";

function Header() {
    return (
        <>
            <header className="flex justify-between my-8 items-center text-black">
                <h1 className="font-bold text-2xl ">
                    <Link href="/">Dev's Blog</Link>
                </h1>
                <nav className="flex text-base ">
                    <Link href="/" className="ml-8 mr-4">
                        HOME
                    </Link>
                    <Link href="/about" className="mr-4">
                        ABOUT
                    </Link>
                    <Link href="/posts" className="mr-4">
                        POST
                    </Link>
                    <Link href="/contact" className="mr-4">
                        CONTACT
                    </Link>
                </nav>
            </header>
        </>
    );
}

export default Header;
