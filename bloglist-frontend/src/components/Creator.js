
const Creator = ({addBlog,title,author, url,handleTitle,handleAuthor,handleUrl}) => {
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