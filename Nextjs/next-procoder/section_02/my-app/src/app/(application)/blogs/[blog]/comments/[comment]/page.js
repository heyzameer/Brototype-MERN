import React from 'react'

const page = async ({params}) => {
    const {blog,comment} = await params;
  return (
    <div>
      <h1>Comments No.{comment} on blog: <b>{blog}</b> page!</h1>
    </div>
  )
}

export default page
