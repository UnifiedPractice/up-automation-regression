/// <reference types="cypress" />

import BasePage from "./base-page";

class PatientPortal extends BasePage{

    private radioSelector: string = '.md-radio';
    private formControl: string = '.form-control';
    private loginButton: string = '.btn-login';

    openPP(): void {
        cy.wait(1500)
        cy.wait(1500).get('.label-pp-url').eq(1).invoke('removeAttr', 'target').click().wait(3500)
    }

    selectRadio(value: number): void {
        cy.wait(2500).get(this.radioSelector).eq(value).click();
    }

    loginCredentials(email,password): void {
        cy.get(this.formControl).eq(0).type(email);
        cy.get(this.formControl).eq(1).type(password);
    }
    
    selectLocation(name: string) : void { 
        cy.contains(name).click();
    }

    selectService(name: string) : void { 
        cy.contains(name).click();
    }

    pressLogin(): void {
        cy.get(this.loginButton).click();
    }

    checkSuccessLogin() : void {
        cy.contains('Upcoming').should('be.visible');
    }

    checkLogin() {
        cy.wait(1500)
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
          }

        shouldBeVisible(name: string): void {
            cy.wait(1200).contains(name).should('be.visible')
        }

        shouldNotBeVisible(name: string): void {
            cy.wait(1200).contains(name).should('not.exist')
        }
}

export default PatientPortal