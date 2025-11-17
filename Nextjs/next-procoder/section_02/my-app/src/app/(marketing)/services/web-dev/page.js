import Link from "next/link";

export const metadata = {
  title: 'Web Dev',
  description: 'A Next.js application with custom layout',
}

export default function Service() {
    return (
        <>
        <h1>Welcome to Web Dev Service!</h1>
       <Link href="/services">Back to Services</Link>
        </>
    );
}   