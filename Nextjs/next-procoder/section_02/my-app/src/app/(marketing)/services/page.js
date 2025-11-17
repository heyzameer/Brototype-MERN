import Link from "next/link";
export const metadata = {
  title: 'Services',
  description: 'A Next.js application with custom layout',
}

export default function Service() {
    return (
        <>
        <h1>Welcome to Services page!</h1>
            <Link href="/">Home</Link> {" "}
            <Link href="/services/web-dev">Web Development</Link> {" "}
            <Link href="/services/seo">SEO</Link> {" "}
        </>
    );
}  