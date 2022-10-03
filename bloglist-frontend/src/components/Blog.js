import { useState } from "react"

const Blog = ({blog}) => {
  const [view,setView] = useState(false)

  const handleClick= (event) => {
    event.preventDefault()
    setView(view ? false : true)
  }

  if(view){
    return (
    <div className="show">
      <p>{blog.title}, {blog.author} <button onClick={handleClick}>Hide</button></p>
       <p>Likes: {blog.likes} <button>Like</button></p> 
       <p>Added by user: {blog.user.username}</p>
    </div>
    )
  } else{
    return (
      <div className="show">
        {blog.title}, {blog.author}
        <button onClick={handleClick}>View</button>
      </div>
      )
  }
}

export default Blog