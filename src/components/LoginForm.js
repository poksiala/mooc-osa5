import React from 'react'

const LoginForm = props => {
  return(
    <div>     
      <form onSubmit={props.handleSubmit}>
        <div>
          username:
          <input
            type="text"
            name="username"
            value={props.username}
            onChange={props.handleChange}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={props.handleChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm