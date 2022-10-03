import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import LoggedIn from './components/Logged'
import Creator from './components/Creator'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername]= useState('')
  const [password,setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage,setErrorMessage]= useState(null)

  const [status,setStatus]=useState(null)
  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin=async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setStatus("error")
      setTimeout(() => {
        setErrorMessage(null)
        setStatus(null)
      }, 3000)
    }
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  const logOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
    setErrorMessage(`Added new blog, ${returnedBlog.title} by ${returnedBlog.author}`)
    setStatus("success")
    setTimeout(() => {
      setErrorMessage(null)
      setStatus(null)
    }, 3000)
    setBlogs(blogs.concat(returnedBlog))
    })
  }
  return (
    <div>
      <Notification message={errorMessage} status={status}/>
    {user === null ?  
      <Login username={username} password={password} handleLogin={handleLogin} handlePassword={handlePassword} handleUsername={handleUsername}/> 
      :
      <>
      <h2>Blogs</h2>
      <LoggedIn username={user.name} logOut={logOut}/>
      <Togglable buttonLabel='Add blog' ref={ blogFormRef}>
        <Creator createBlog={addBlog}/>
      </Togglable>
      {blogs.sort((a,b)=> b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    }
    </div>
  )
}

export default App
