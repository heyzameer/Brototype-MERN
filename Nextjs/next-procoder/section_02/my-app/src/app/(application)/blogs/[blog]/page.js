import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({ params }) {
    const { blog } = await params;
    return {
        title: `Blog ${blog}`,
        description: `This is the blog page for blog ${blog}`,
    };
}

const page = async ({params}) => {
    console.log(await params);
    const {blog} = await params;
    if (!/^d+$/ .test(blog)) {
        notFound();
    }
  return (
    
    <div>
      <h1>Welcome to Blog {blog} page!</h1>
      <Link href="/blogs">Home</Link> {" "}
    </div>
  )
}

export default page
