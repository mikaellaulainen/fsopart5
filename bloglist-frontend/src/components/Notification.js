const Notification = ({ message,status }) => {
  if (message === null) {
    return null
  }
  if(status === 'error'){
    return (
      <div className="error">
        <p>{message}</p>
      </div>
    )
  }
  if(status === 'success'){
    return (
      <div className="success">
        <p>{message}</p>
      </div>
    )
  }
}


export default Notification