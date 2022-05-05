/// <reference types="cypress" />

import BasePage from "./base-page";

class PatientPortal extends BasePage{

    private radioSelector: string = '.md-radio';
    private formControl: string = '.form-control';
    private loginButton: string = '.btn-login';
    private radioTabSelector: string = '.md-radio-tab';
    private randomize: any;

    openPP(): void {
        cy.get('.label-pp-url').eq(1).invoke('removeAttr', 'target').click()

    }

    selectRadio(value: number): void {
        cy.wait(900).get(this.radioSelector).eq(value).click();
    }

    chooseRandomHour(): void {
        this.randomize = Math.floor(Math.random() * this.radioTabSelector.length)
        cy.wait(700).get(this.radioTabSelector).eq(this.randomize).click();
    }

    loginCredentials(email,password): void {
        cy.get(this.formControl).eq(0).type(email);
        cy.get(this.formControl).eq(1).type(password);
    }
    
    selectLocation(name: string) : void { 
        cy.contains(name).click().wait(800);
    }

    selectService(name: string) : void { 
        cy.contains(name).click().wait(800);
    }

    selectPractitioner(name: string) : void { 
        cy.contains(name).click().wait(800);
    }

    pressLogin(): void {
        cy.get(this.loginButton).click();
    }

    checkSuccessLogin() : void {
        cy.contains('Upcoming').should('be.visible');
    }

    checkLogin() {
        cy.get('.burger-menu').click();
        cy.get('.mat-menu-item').then(($el) => {
            if($el.length > 3){
                cy.get('.burger-menu').click({force:true});
                cy.contains('Logout').click({force:true});
                cy.wait(700);
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

        setToOff(): void {
            cy.get('.switch__obj').eq(2).parent().find('input').uncheck({force:true})

        }

        waitForPageToLoad( ): void{
            cy.intercept('https://staging.unifiedpractice.com/Public/Clinic/GetPatientPortalSettings').as('settings');
            cy.wait('@settings');
        }
        
}

export default PatientPortal