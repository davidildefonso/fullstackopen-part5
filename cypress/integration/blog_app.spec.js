describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'mario',
      username: 'yessir',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
	cy.visit('http://localhost:3000') 
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  }) 

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

	it('user can login', function () {
		cy.contains('login').click()
		cy.get('#username').type('yessir')
		cy.get('#password').type('salainen')
		cy.get('#login-button').click()

		cy.contains('mario logged in')
	})  
 
	describe('when logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'yessir', password: 'salainen' })
		
		})

		it('a new blog can be created', function() {
			cy.contains('Create').click()			
			cy.get('#title').type('un titulo')
			cy.get('#author').type('un autor')
			cy.get('#url').type('www.url.com')
			cy.get('#create-blog-button').click()
			cy.contains('un titulo')
		})

		describe('and a blog  exists', function () {
			beforeEach(function () {			
				
				cy.createBlog({ title: 'otro titulo', author: "otro autor", url: "www.otrourl.com" })
			})

			it('user can like the blog', function () {
				cy.contains('view').click()
				cy.contains('likes: 0')
				cy.contains('like').click()
				cy.contains('likes: 1')
			
			})

			it('user can delete the blog if it created it', function () {
				cy.contains('view').click()				
				cy.contains('remove').click()
				cy.contains('otro titulo').should('not.exist')
			
			})

			
		})

	
	})

	

	it('user cannot delete a blog created by other user', function () {
		
		const user = {
			name: 'luigi',
			username: 'luigi',
			password: 'password'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user) 
		cy.contains('login').click()	
		cy.login({ username: 'luigi', password: 'password' })				
		cy.createBlog({ title: 'otro titulo', author: "otro autor", url: "www.otrourl.com" })
		cy.contains('logout').click()

		cy.contains('login').click()
		cy.login({ username: 'yessir', password: 'salainen' })	

		cy.contains('view').click()				
		cy.contains('remove').should("not.exist")
		cy.contains('otro titulo')
	
	})
 
	it('login fails with wrong password', function() {
		cy.contains('login').click()
		cy.get('#username').type('yessir')
		cy.get('#password').type('wrong')
		cy.get('#login-button').click()

		cy.get('.error').contains('Wrong credentials') 
	})
})

