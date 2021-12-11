import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		title: 'a title of test react',
		author: "author test jr",
		url: "www.testurl.com",
		likes: 5
		
	}

	const component = render(
		<Blog blog={blog} />
	)


	expect(component.container).toHaveTextContent(
		'a title of test react'
	)
	expect(component.container).toHaveTextContent(
		'author test jr'
	)
	expect(component.container).not.toHaveTextContent(
		5
	)
	expect(component.container).not.toHaveTextContent(
		'www.testurl.com'
	)


})


test('it shows the details of blog after click on view button', () => {
	const blog = {
		title: 'a title of test react',
		author: "author test jr",
		url: "www.testurl.com",
		likes: 5, 
		user: { name: 'mr test '}
		
	}


	const component = render(
		<Blog blog={blog}  />
	)


	const button = component.getByText('view')

	fireEvent.click(button)

	expect(component.container).toHaveTextContent(
		5
	)
	expect(component.container).toHaveTextContent(
		'www.testurl.com'
	)
})