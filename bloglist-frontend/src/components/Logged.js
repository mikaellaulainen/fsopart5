const LoggedIn= ({username, logOut}) => {
  return (
    <>
    <p>Logged in as {username}! <button onClick={logOut}>Log out</button></p>

    </>
  )
}
export default LoggedIn