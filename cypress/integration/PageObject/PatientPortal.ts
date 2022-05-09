/// <reference types="cypress" />

class PatientPortal{

    private radioSelector: string = '.md-radio';
    private formControl: string = '.form-control';
    private loginButton: string = '.btn-login';

    openPP(): void {
        cy.clearCookies()
        //cy.wait(1500)

        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/ppncfpccpe/organization').as('ppOrganization');
        cy.get('.label-pp-url').eq(1).invoke('removeAttr', 'target').click()
        cy.clearCookies();

        cy.wait('@ppOrganization');
        //cy.wait(3500)
    }

    selectRadio(value: number): void {
        //cy.wait(2500);
        cy.get(this.radioSelector).eq(value).click();
    }

    loginCredentials(email,password): void {
        cy.get(this.formControl).eq(0).type(email);
        cy.get(this.formControl).eq(1).type(password);
    }

    pressLogin(): void {
        cy.get(this.loginButton).click();
    }

    checkSuccessLogin() : void {
        cy.contains('Upcoming').should('be.visible');
    }

    checkLogin() {
        //cy.wait(1500)
        cy.get('.burger-menu').click();
        cy.get('.mat-menu-item').then(($el) => {
            if($el.length > 3){
                cy.get('.burger-menu').click({force:true});
                cy.contains('Logout').click({force:true});
                cy.wait(1500);
            }
            cy.get('.logo-symbol').click({ force: true })
            cy.get('.mat-menu-content').click();
        })
        
        
        // else if (cy.get(".nav-link")){
        //     cy.contains('Logout').click({ force: true });
        //     cy.get('.logo-symbol').click({ force: true })

        // }
        // else if (cy.contains('Email')) {
        // cy.get('.logo-symbol').click({ force: true })
        // }

        // if ( Cypress.$(".burger-menu").length > 0  ) {
        //     cy.get('.navbar-toggler').click({ force: true });
        //     cy.contains('Logout').click({ force: true });
        // }
        // else if ( Cypress.$(".nav-link").length > 0 ) {
        //         cy.contains('Logout').click({ force: true });
        //     } 
        // else 

          }
        shouldBeVisible(name: string): void {
            cy.contains(name).should('be.visible')
        }

        shouldNotBeVisible(name: string): void {
            cy.contains(name).should('not.exist')
        }
}

export default PatientPortal
