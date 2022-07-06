/// <reference types="cypress" />
import "cypress-localstorage-commands"

class SideBarNavigate  {

    public level1Selector: string = '.menu-level-1';
    public level2Selector: string = '.menu-level-2';
    public arrowSelector: string = '.hamburger-arrow-left';

    selectCalendar() : void {
        cy.get(this.level1Selector).eq(1).click();
    }

    extendMenu() : void{
        cy.get('.navbar-header-left').then(($el) => {
            if ($el.hasClass('small')) {
                cy.get(this.arrowSelector).click()
            }
        })
    }

    selectMyPatients() : void {
        cy.get(this.level1Selector).eq(2).click();
        cy.get(this.level2Selector).eq(0).click();
    }

    selectAllClinicPatients (): void {
        cy.get(this.level1Selector).eq(2).click();
        cy.get(this.level2Selector).eq(1).click();
    }

    selectPP(): void {
        // cy.intercept('https://staging.unifiedpractice.com/Public/Scripts/dist/styles-es2015.285057ac2a15fc9d939f.js', {statusCode: 200, fixture: 'avoid'}).as('pp')
        // cy.intercept('https://staging.unifiedpractice.com/Public/Scripts/dist/vendor-es2015.dcc2a474d2fb925a6676.js', {statusCode: 200, fixture: 'avoid'}).as('pp2')
        cy.intercept('https://data.pendo.io/data/ptm.gif/',{statusCode: 200, fixture: 'avoid'}).as('url')
            cy.get(this.level1Selector).eq(8).click()
        // cy.wait('@pp')
        // cy.wait('@pp2')

    }

    selectCS(name: string) : void {
        
        cy.get(this.level1Selector).eq(9).click();  
        cy.get(this.level2Selector).contains(name).click({force:true});

    }
}

export default SideBarNavigate
