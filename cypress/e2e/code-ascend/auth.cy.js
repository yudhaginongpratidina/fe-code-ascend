describe('authentication test', () => {

    const url = 'http://192.168.1.5:5000/'

    it('Register', () => {
        cy.visit(url)
        cy.contains('Login').click()
        cy.wait(2000)
        cy.contains('Sign up').click()
        cy.wait(2000)

        cy.get('#full_name').type('user x')
        cy.get('#username').type('user_x')
        cy.get('#email').type('user_x@gmail.com')
        cy.get('#password').type('user_x@gmail.com')
        cy.get('#confirm_password').type('user_x@gmail.com')

        cy.get('button').contains('Register').click()
        cy.contains('user registered successfully').should('be.visible')
        cy.wait(2000)
    })

    it('Login', () => {
        cy.visit(url)
        cy.contains('Login').click()
        cy.wait(2000)
        cy.get('#username_or_email').type('user_x@gmail.com')
        cy.get('#password').type('user_x@gmail.com')
        cy.get('button').contains('Login').click()
        cy.contains('user logged in successfully').should('be.visible')
        cy.wait(2000)
        cy.visit(url)
    })
})
