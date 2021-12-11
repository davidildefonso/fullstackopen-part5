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

		<form className="form"  onSubmit={addBlog}>
			<h3>Create New</h3>
			<p>Title: <input className="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} /> </p>
			<p>Author: <input className="author"  id="author" value={author} onChange={(e) => setAuthor(e.target.value)} /> </p>
			<p>Url: <input className="url"  id="url" value={url} onChange={(e) => setUrl(e.target.value)} /> </p>
			
			<button type="submit" id="create-blog-button">Create</button>
		</form>
	</div>
	)
}

export default BlogForm
