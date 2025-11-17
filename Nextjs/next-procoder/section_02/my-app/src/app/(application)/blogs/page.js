import Link from "next/link";

export const metadata = {
  title: 'Blogs',
  description: 'A Next.js application with custom layout',
}

export default function blogs() {
    return (
        <>
            <h1>Welcome to Blogs page!</h1>
            <Link href="/">Home</Link> {" "}
            <h1>All Blogs</h1>
            <p>Blog 1</p>
            <p>Blog 2</p>
            <p>Blog 3</p>
        </>
    )
}