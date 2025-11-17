import Link from "next/link";
export const metadata = {
  title: 'About',
  description: 'A Next.js application with custom layout',
}

export default function About() {
    return (
        <>
        <h1>Welcome to About page!</h1>
           <Link href="/">Home</Link> {" "}
            <Link href="/about">About</Link> {" "}
           <Link href="/services">Services</Link> {" "}
            <Link href="/blogs">Blogs</Link>{" "}
            <Link href="/files">Files</Link>
            {/* <a href="/about">About</a> */}
        </>
    );
}   