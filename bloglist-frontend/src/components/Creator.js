import { useState } from "react"

const Creator = ({createBlog}) => {
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title,setTitle] = useState('')
  
  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: title,
        author:author,
        url:url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  
  return (
    <>
      <h4>Create new blog</h4>
      <form onSubmit={addBlog}>
        <p>Title:<input type="text" value={title} onChange={handleTitle}/></p>
        <p>Author:<input type="text" value={author} onChange={handleAuthor}/></p> 
        <p>Url:<input type="text" value={url} onChange={handleUrl}/></p>
        <button>Add</button>
      </form>
    </>
  )
}

export default Creator

//url={url} handleAuthor={handleAuthor} handleTitle={handleTitle} handleUrl={handleUrl}/>