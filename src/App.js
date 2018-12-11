import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Error from './components/error'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      name: null,
      user: null,
      username: "",
      password: "",
      title: "",
      author: "",
      url: "",
      notification: null,
      error: null,
    }
  }

  componentDidMount() {

    const userJson = window.localStorage.getItem('blogsUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      this.setState({
        user
      })
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('blogsUser', JSON.stringify(user))

      blogService.setToken(user.token)
      this.setState({ 
        username: '', 
        password: '', 
        user
      })
      this.setNotification('Succesfull login')

      
    } catch(exception) {
      this.setState({
        username: '',
        password: ''
      })
      this.setError('Invalid username or password')
      console.log(exception)
    }
  }

  logout = () => {
    this.setState({user: null})
    window.localStorage.removeItem('blogsUser')
    this.setNotification('Logged out')
  }

  addBlog = async (event) => {
    event.preventDefault()
    const {title, author, url} = this.state
    try {
      const newBlog = await blogService
        .create({
          title,
          author,
          url
        })

      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        title: '',
        author: '',
        url: ''
      })
      this.setNotification(`a new blog '${newBlog.title}' added.`)      
    } catch (exception) {
      this.setError(`Error. See console for details :)`)
      console.error(exception)
    }
  }

  setNotification = (notification) => {
    this.setState({notification})
    setTimeout(() => this.setState({notification: null}), 2000)
  }

  setError = (error) => {
    this.setState({error})
    setTimeout(() => this.setState({error: null}), 2000)
  }

  render() {

    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.notification} />
          <Error message={this.state.error} />
          <h2>Log in</h2>
      
          <form onSubmit={this.login}>
            <div>
              username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>
              password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleFieldChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        <Notification message={this.state.notification} />
        <Error message={this.state.error} />
        <p>
          {this.state.user.name} logged in. <button onClick={this.logout}>logout</button>
        </p>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
          <div>
    <h2>Create new</h2>

    <form onSubmit={this.addBlog}>
      <input
        name="title"
        value={this.state.title}
        onChange={this.handleFieldChange}
      />
      <input
        name="author"
        value={this.state.author}
        onChange={this.handleFieldChange}
      />
      <input
        name="url"
        value={this.state.url}
        onChange={this.handleFieldChange}
      />
      <button type="submit">tallenna</button>
    </form>
  </div>
      </div>
      
    );
  }
}



export default App;
