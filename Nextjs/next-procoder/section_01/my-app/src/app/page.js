"use client";
import Image from "next/image";

export default function Home() {
  console.log("Home page rendered");
  return (
<>
<h1 onClick={()=>{
  console.log("Header clicked");
}}>Welcome to Next.js!</h1>
</>
  );
}
