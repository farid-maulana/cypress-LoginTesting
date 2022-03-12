describe('Login', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('a').contains('Login').click()
    })
    
    it('Memasukkan ID Anggota saja', () => {
        const id_anggota = '123456789'

        cy.get('input[name="memberId"]').type(id_anggota)

        cy.get('form').submit()

        cy.get('input[name="memberId"]').should('have.value', id_anggota)

        cy.get('div.bg-red-100')
            .should('be.visible')
            .contains('Maaf: Incomplete request')
    });

    it('Memasukkan Password saja', () => {
        const password = '060300'

        cy.get('input[name="password"]').type(password)

        cy.get('form').submit()

        cy.get('input[name="password"]').should('have.value', password)

        cy.get('div.bg-red-100')
            .should('be.visible')
            .contains('Maaf: Incomplete request')
    });

    it('Memasukkan ID Anggota yang Salah', () => {
        const id_anggota = '123456789'
        const password = '060300'

        cy.get('input[name="memberId"]').type(id_anggota)
        cy.get('input[name="password"]').type(password)

        cy.get('form').submit()

        cy.get('input[name="memberId"]').should('have.value', id_anggota)
        cy.get('input[name="password"]').should('have.value', password)

        cy.get('div.bg-red-100')
            .should('be.visible')
            .contains('Maaf: ID tidak terdaftar pada SIAKAD/SIMPEG')
        
        cy.get('button').contains('Login').should('be.disabled')
    });

    it('Memasukkan Password yang Salah', () => {
        const id_anggota = '1941720012'
        const password = '123456'

        cy.get('input[name="memberId"]').type(id_anggota)
        cy.get('input[name="password"]').type(password)

        cy.get('form').submit()

        cy.get('input[name="memberId"]').should('have.value', id_anggota)
        cy.get('input[name="password"]').should('have.value', password)

        cy.get('div.bg-red-100')
            .should('be.visible')
            .contains('Maaf: ID atau password salah')
        
        cy.get('button').contains('Login').should('be.disabled')
    });
    
    it('Memasukkan ID Anggota dan Password yang Benar', () => {
        const id_anggota = '1941720012'
        const password = '060300'

        cy.get('input[name="memberId"]').type(id_anggota)
        cy.get('input[name="password"]').type(password)

        cy.get('form').submit()

        cy.location().should((location) => {
            expect(location.pathname).to.eq('/member')
        })
    });
})