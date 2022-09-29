import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import LoggedIn from './components/Logged'
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
    console.log("Loggin in", username, password)

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
      setErrorMessage('wrong credentials')
      console.log(errorMessage)
      setErrorMessage('')
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
  return (
    <div>
    {user === null ?  
      <Login username={username} password={password} handleLogin={handleLogin} handlePassword={handlePassword} handleUsername={handleUsername}/> 
      :
      <>
      <h2>Blogs</h2>
      <LoggedIn username={user.name} logOut={logOut}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    }
    </div>
  )
}

export default App
