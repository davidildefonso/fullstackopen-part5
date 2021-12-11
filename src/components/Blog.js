import React, {useState} from 'react'


const Blog = ({blog, likeBlog, deleteBlog}) => {

	let isUsertheAuthor = false

	const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

	if (loggedUserJSON) {
		isUsertheAuthor = blog.user.username === JSON.parse(loggedUserJSON).username ? true: false
	}
	
		

	const [detailsVisible, setDetailsVisible] = useState(false);


	const handleClick = () => {	
		likeBlog(blog.likes + 1, blog.id)
	} 

	const removeBlog = () => {
		const confirm = window.confirm(`Are you sure to delete blog ${blog.title}`)
		confirm && deleteBlog(blog.id)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	

	return (
	<div style={blogStyle} >
			<p> 
				{blog.title}
				{blog.author}
				<button
					onClick={() => setDetailsVisible(!detailsVisible)} >
					{detailsVisible ? "hide" : "view"}  
				</button>
			</p>
			{detailsVisible && 
				<div>
					<p> {blog.url} </p>
					<p> likes: {blog.likes}  <button onClick={handleClick} >like</button> </p>
					<p> {blog.user.name} </p>
					{isUsertheAuthor && 
						<p><button onClick={removeBlog} > remove </button> </p>
					}
					
				</div>}
	</div>  
	)
}

export default Blog