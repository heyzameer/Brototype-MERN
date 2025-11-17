import React from 'react'

const page = async ({params}) => {
    const {blog} = await params;
  return (
    <div>
      <h1>All comments on blog: <b>{blog}</b> page!</h1>
    </div>
  )
}

export default page
