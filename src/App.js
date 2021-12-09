import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js';
import Notification from "./components/Notification.js";

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [username, setUsername] = useState('') 
	const [password, setPassword] = useState('') 
	const [title, setTitle] = useState('') 
	const [author, setAuthor] = useState('') 
	const [url, setUrl] = useState('') 
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)  
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
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
				'loggedNoteappUser', JSON.stringify(user)
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
				'loggedNoteappUser', JSON.stringify(user)
			) 
			setUser(null)
	}

	const addBlog = async (event) => {
			event.preventDefault();

			const newBlog = {
				title,
				author,
				url		
			};

			try {
				const data = await blogService.create( newBlog)
				setBlogs(blogs.concat( {...newBlog, id: data.id} ));
				setTitle('')
				setAuthor('')
				setUrl('')

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


	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)

	const blogForm = () => (

		<form onSubmit={addBlog}>
			<h3>Create New</h3>
			<p>Title: <input value={title} onChange={(e) => setTitle(e.target.value)} /> </p>
			<p>Author: <input value={author} onChange={(e) => setAuthor(e.target.value)} /> </p>
			<p>Url: <input value={url} onChange={(e) => setUrl(e.target.value)} /> </p>
			
			<button type="submit">Create</button>
		</form> 
	)


	return (
	<div>
		<h2>blogs</h2>
		<Notification message={errorMessage} type={'error'} />
		<Notification message={successMessage} type={'success'} />
		{!user && <div>
				<p>log in to application</p>
				{loginForm()}
			</div> }
		{user &&  
			<div>
				<p>  {user.name} logged-in  <span> <button onClick={handleLogOut} >logout</button> </span>  </p>
				{blogForm()}
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
		 }
		
	</div>
	)
}

export default App