describe('User Management Test', () => {
    const url = 'http://192.168.1.5:3000'

    it('Change Role', () => {
        cy.visit(url)
        cy.contains('Login').click()
        cy.wait(2000)
        cy.get('#username_or_email').type('superadmin@gmail.com')
        cy.get('#password').type('superadmin@gmail.com')
        cy.get('button').contains('Login').click()
        cy.contains('user logged in successfully').should('be.visible')
        cy.wait(2000)
        cy.get('button').contains('User Management').click()

        cy.wait(1000)
        cy.get('button').contains('User').click()
        cy.wait(1000)
        cy.get('button#change-role').click()
        cy.wait(3000)
        cy.get('select#role').select(1).should('have.value', 'admin')
        cy.get('button').contains('Change').click()
        cy.wait(2000)
        cy.get('button').contains('Admin').click()
        cy.wait(3000)
        cy.get('button#change-role').click()
        cy.wait(3000)
        cy.get('select#role').select(0).should('have.value', 'user')
        cy.get('button').contains('Change').click()
        cy.wait(3000)
        cy.get('button').contains('User').click()
    })
});