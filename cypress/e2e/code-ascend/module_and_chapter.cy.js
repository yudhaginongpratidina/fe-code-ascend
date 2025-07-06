describe('Module and Chapter Test', () => {

    const url = 'http://192.168.1.5:5000'

    describe('Module Manegement', () => {
        it('Create Module', () => {
            cy.visit(url)
            cy.contains('Login').click()
            cy.wait(2000)
            cy.get('#username_or_email').type('superadmin@gmail.com')
            cy.get('#password').type('superadmin@gmail.com')
            cy.get('button').contains('Login').click()
            cy.contains('user logged in successfully').should('be.visible')
            cy.wait(2000)
            cy.get('button').contains('Modul Management').click()

            cy.wait(1000)
            cy.get('button').contains('New').click()
            cy.wait(1000)
            cy.get('#title').type('new module')
            cy.get('textarea').type('this is a new module')
            cy.get('select#level').select(1).should('have.value', 'intermediate')
            cy.get('button').contains('Create').click()
        })

        it('View Module', () => {
            cy.visit(url)
            cy.contains('Login').click()
            cy.wait(3000)
            cy.get('#username_or_email').type('superadmin@gmail.com')
            cy.get('#password').type('superadmin@gmail.com')
            cy.get('button').contains('Login').click()
            cy.contains('user logged in successfully').should('be.visible')
            cy.wait(3000)
            cy.get('button').contains('Modul Management').click()
        })

        it('Update Module', () => {
            cy.visit(url)
            cy.contains('Login').click()
            cy.wait(3000)
            cy.get('#username_or_email').type('superadmin@gmail.com')
            cy.get('#password').type('superadmin@gmail.com')
            cy.get('button').contains('Login').click()
            cy.contains('user logged in successfully').should('be.visible')
            cy.wait(3000)

            cy.get('button').contains('Modul Management').click()
            cy.wait(1000)
            cy.get('button#edit-module-button').click()

            cy.wait(1000)
            cy.get('#title').clear()
            cy.get('#title').type('new module')
            cy.get('textarea').clear()
            cy.get('textarea').type('this is a new module')
            cy.get('select#level').select(1).should('have.value', 'intermediate')
            cy.get('select#is_published').select(1).should('have.value', 'true')
            cy.get('select#is_free').select(1).should('have.value', 'true')
            cy.get('button').contains('Update').click()
        })
    })


    describe('Chapter Test', () => {
        it('Create Chapter', () => {
            cy.visit(url)
            cy.contains('Login').click()
            cy.wait(3000)

            cy.get('#username_or_email').type('superadmin@gmail.com')
            cy.get('#password').type('superadmin@gmail.com')
            cy.get('button').contains('Login').click()
            cy.contains('user logged in successfully').should('be.visible')
            cy.wait(3000)

            cy.get('button').contains('Modul Management').click()
            cy.wait(1000)
            cy.get('button#chapters-module-button').click()
            cy.wait(3000)

            cy.get('button').contains('New').click()
            cy.wait(1000)
            cy.get('#title').type('new chapter')
            cy.get('textarea').type('this is a new chapter')
            cy.get('select#is_published').select(1).should('have.value', 'true')
            cy.get('button').contains('Create').click()
        })

        it('Edit Chapter', () => {
            cy.visit(url)
            cy.contains('Login').click()
            cy.wait(3000)

            // login
            cy.get('#username_or_email').type('superadmin@gmail.com')
            cy.get('#password').type('superadmin@gmail.com')
            cy.get('button').contains('Login').click()
            cy.contains('user logged in successfully').should('be.visible')
            cy.wait(3000)

            // module
            cy.get('button').contains('Modul Management').click()
            cy.wait(1000)
            cy.get('button#chapters-module-button').click()
            cy.wait(3000)

            // chapter
            cy.get('button#edit').click()
            cy.get('#title').clear()
            cy.get('#title').type('chapter update')
            cy.get('textarea').clear()
            cy.get('textarea').type('this is a chpater update')
            cy.get('select#is_published').select(1).should('have.value', 'true')
            cy.get('button').contains('Update').click()
        })
    })
})
