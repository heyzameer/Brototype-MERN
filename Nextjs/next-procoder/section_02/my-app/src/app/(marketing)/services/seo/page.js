import Link from "next/link";

export const metadata = {
  title: 'SEO',
  description: 'A Next.js application with custom layout',
}

export default function Service() {
    return (
        <>
        <h1>Welcome to SEO Service!</h1>
       <Link href="/services">Back to Services</Link>
        </>
    );
}   