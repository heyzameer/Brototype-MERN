import React from 'react'

const ListUser = () => {
    const users = [
        { name: "Zameer", age: 25,date: "2023-05-10" },
        { name: "Ayesha", age: 22,date: "2023-05-15" },
        { name: "Bilal", age: 30,date: "2023-05-1" }
      ];

    //   users.sort((a,b)=>a.age - b.age)
    //   users.sort((a,b)=>a.name.localeCompare(b.name))
    //   users.sort((a,b)=> new Date(b.date)- new Date(a.date))

    const list = users.filter(user=> user.age > 22).map(user=><li>{user.name}:&nbsp;{user.age}</li>)
    // const list = users.map(user=><li>{user.name}:&nbsp;{user.age}</li>)
  return (
    <div>
      <ul>{list}</ul>
    </div>
  )
}

export default ListUser
