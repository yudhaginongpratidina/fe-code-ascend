describe('Enrolled And Learning Management Test', () => {
    const url = 'http://192.168.1.6:5000'

    it('Enroll Module', () => {
        cy.visit(url+'/login')
        cy.get('#username_or_email').type('superadmin@gmail.com')
        cy.get('#password').type('superadmin@gmail.com')
        cy.get('button').contains('Login').click()
        cy.visit(url + '/list-module')
        cy.contains('new module').click()
        // cy.contains('Enroll Now').click()
    })

    it('Learn Module', () => {
        cy.visit(url+'/login')
        cy.get('#username_or_email').type('superadmin@gmail.com')
        cy.get('#password').type('superadmin@gmail.com')
        cy.get('button').contains('Login').click()
        cy.wait(2000)

        cy.visit(url + '/dashboard')
        cy.get('button').contains('My Learning').click()
         cy.wait(2000)
        cy.contains('new module').click()
        cy.contains('chapter update').click()
        cy.contains('Open Live Editor').click()
        cy.contains('Close Live Editor').click()
        cy.contains('Mark as Completed').click()
        cy.contains('Back').click()
    })
});