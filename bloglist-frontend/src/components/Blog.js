import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [view,setView] = useState(false)
  const [likes,setLikes] = useState(blog.likes)

  const handleClick= (event) => {
    event.preventDefault()
    setView(view ? false : true)
  }

  const updateLikes = (event) => {
    event.preventDefault()
    const updatedBlog={ ...blog, likes: likes+1 }
    console.log(updatedBlog)
    blogService
      .update(blog.id,updatedBlog)
      .then(returnedblog => {
        setLikes(returnedblog.likes)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const removeBlog = (event) => {
    event.preventDefault()
    console.log('remove button pressed')
    if (window.confirm(`Remove blog: ${blog.title} By: ${blog.author}`)) {
      blogService
        .removeBlog(blog.id)
        .catch(error => {
          console.log(error)
        })
    }

  }
  if(view && blog.user.username === user.username){
    return (
      <div className="show">
        <p>{blog.title}, {blog.author} <button onClick={handleClick}>Hide</button></p>
        <p>{blog.url}</p>
        <p>Likes: {likes} <button onClick={updateLikes}>Like</button></p>
        <p>Added by user: {blog.user.username}</p>
        <button onClick={removeBlog}>Remove</button>
      </div>
    )
  }else if(view){
    return (
      <div className="show">
        <p>{blog.title}, {blog.author} <button onClick={handleClick}>Hide</button></p>
        <p>{blog.url}</p>
        <p>Likes: {likes} <button onClick={updateLikes}>Like</button></p>
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