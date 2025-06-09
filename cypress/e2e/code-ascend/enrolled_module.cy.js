describe('Enrolled And Learning Management Test', () => {
    const url = 'http://192.168.1.5:3000'

    // it('Enroll Module', () => {
    //     cy.visit(url)
    //     cy.contains('Login').click()
    //     cy.wait(2000)
    //     cy.get('#username_or_email').type('superadmin@gmail.com')
    //     cy.get('#password').type('superadmin@gmail.com')
    //     cy.get('button').contains('Login').click()
    //     cy.contains('user logged in successfully').should('be.visible')
    //     cy.wait(2000)

    //     cy.visit(url + '/list-module')
    //     cy.wait(3000)
    //     cy.contains('new module').click()
    //     cy.wait(3000)
    //     cy.contains('Enroll Now').click()
    //     cy.wait(3000)
    // })

    it('Learn Module', () => {
        cy.visit(url)
        cy.contains('Login').click()
        cy.wait(2000)
        cy.get('#username_or_email').type('superadmin@gmail.com')
        cy.get('#password').type('superadmin@gmail.com')
        cy.get('button').contains('Login').click()
        cy.contains('user logged in successfully').should('be.visible')
        cy.wait(2000)

        cy.visit(url + '/dashboard')
        cy.get('button').contains('My Learning').click()
        cy.wait(3000)
        cy.contains('new module').click()
        cy.wait(3000)
        cy.contains('chapter update').click()
        cy.wait(3000)
        cy.contains('Open Live Editor').click()
        cy.wait(3000)
        cy.contains('Close Live Editor').click()
        cy.contains('Mark as Completed').click()
        cy.contains('Back').click()
        cy.wait(3000)
    })
});