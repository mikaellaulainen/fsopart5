import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername]= useState('')
  const [password,setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage,setErrorMessage]= useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin=async (event) => {
    event.preventDefault()
    console.log("Loggin in", username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  return (
    <div>
    {user === null ?  
      <Login username={username} password={password} handleLogin={handleLogin} handlePassword={handlePassword} handleUsername={handleUsername}/> 
      :
      <>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    }
    </div>
  )
}

export default App
