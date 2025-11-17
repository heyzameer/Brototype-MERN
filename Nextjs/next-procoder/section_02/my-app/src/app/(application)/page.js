import Link from 'next/link';
import ComponentPage from '../_components/page';
export const metadata = {

  description: 'A Next.js application with custom layout',
}

export default function Home() {
  return (
    <>
      <h1>Welcome to Tech Agency!</h1>
      <div>
           <Link href="/">Home</Link> {" "}
            <Link href="/about">About</Link> {" "}
            <Link href="/services">Services</Link> {" "}
            <Link href="/blogs">Blogs</Link>{" "}
            <Link href="/files">Files</Link>
      </div>
      <ComponentPage />
    </>
  );
}
