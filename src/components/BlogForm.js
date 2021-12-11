import React, { useState} from 'react'

const BlogForm = ({ createBlog}) => {

	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");



	const addBlog = (event) => {

		event.preventDefault()

		createBlog({
			title,
			author,
			url
		});

		setTitle('')
		setAuthor('')
		setUrl('')

	}

	const blogFormStyle = {
		marginTop: 10,
		marginBottom: 10
	}

	return (
	<div style={blogFormStyle} >
		<h2>Create a new blog</h2>

		<form onSubmit={addBlog}>
			<h3>Create New</h3>
			<p>Title: <input value={title} onChange={(e) => setTitle(e.target.value)} /> </p>
			<p>Author: <input value={author} onChange={(e) => setAuthor(e.target.value)} /> </p>
			<p>Url: <input value={url} onChange={(e) => setUrl(e.target.value)} /> </p>
			
			<button type="submit">Create</button>
		</form>
	</div>
	)
}

export default BlogForm
