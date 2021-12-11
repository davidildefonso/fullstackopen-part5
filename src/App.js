import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js';
import Notification from "./components/Notification.js";
import Togglable from "./components/Togglable.js";
import LoginForm from "./components/LoginForm.js";
import BlogForm from "./components/BlogForm.js";

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [username, setUsername] = useState('') 
	const [password, setPassword] = useState('') 
	const [user, setUser] = useState(null)
	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs.sort((blog1, blog2) => blog2.likes - blog1.likes) )
		)  
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async  (event) => {
		event.preventDefault()
	
		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			) 
			
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')

			setSuccessMessage('successful login!')
			setTimeout(() => {
				setSuccessMessage(null)
			}, 5000)

		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLogOut = () => {
			window.localStorage.removeItem(
				'loggedBlogappUser', JSON.stringify(user)
			) 
			setUser(null)
	}




	const createBlog = async (blogObject) => {
	
			try {
				const newBlog  = await blogService.create( blogObject)
				setBlogs(blogs.concat(newBlog )
					.sort((blog1, blog2) => blog2.likes - blog1.likes) );
		

				setSuccessMessage('successfully blog added!')
				setTimeout(() => {
					setSuccessMessage(null)
				}, 5000)

			} catch (error) {

				setErrorMessage('Ocurrio un error')
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			}

	}


	const likeBlog = async (likes, id) => {
		try {
			const newBlog  = await blogService.update( { likes }, id)
			setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog)
				.sort((blog1, blog2) => blog2.likes - blog1.likes) )
	

			setSuccessMessage('liked blog!')
			setTimeout(() => {
				setSuccessMessage(null)
			}, 5000)

		} catch (error) {

			setErrorMessage('There was an error')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}


	const deleteBlog = async (id) => {
		try {
			await blogService.remove( id)
			setBlogs(blogs.filter(blog => blog.id !== id )
				.sort((blog1, blog2) => blog2.likes - blog1.likes) )
	

			setSuccessMessage('liked blog!')
			setTimeout(() => {
				setSuccessMessage(null)
			}, 5000)

		} catch (error) {

			setErrorMessage('There was an error')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}



	

	return (
	<div>
		<h2>blogs</h2>
		<Notification message={errorMessage} type={'error'} />
		<Notification message={successMessage} type={'success'} />
		{!user && 
			<Togglable buttonLabel='login'>
				<LoginForm
					username={username}
					password={password}
					handleUsernameChange={({ target }) => setUsername(target.value)}
					handlePasswordChange={({ target }) => setPassword(target.value)}
					handleSubmit={handleLogin}
				/>
			</Togglable>}
		{user &&  
			<div>
				<p>  {user.name} logged-in  <span> <button onClick={handleLogOut} >logout</button> </span>  </p>
				{<Togglable buttonLabel="Create" ref={blogFormRef} >
					<BlogForm	createBlog = {createBlog} 	/>
				</Togglable>}
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog}  likeBlog={likeBlog}  deleteBlog = {deleteBlog} />
				)}
			</div>
		 }
		
	</div>
	)
}

export default App