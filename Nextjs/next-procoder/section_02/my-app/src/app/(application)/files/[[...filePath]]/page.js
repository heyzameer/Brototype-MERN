


import Link from 'next/link';
export const metadata = {
  title: 'File',
  description: 'A Next.js application with custom layout',
}
const Page = async ({params}) => {
const {filePath} = await params;
   
  return (
    <div>
        <Link href="/">Home</Link>
        <h1>Filer path random page</h1>
        <p>Files/{filePath?.join('/')}</p>
    </div>
  )
}

export default Page
