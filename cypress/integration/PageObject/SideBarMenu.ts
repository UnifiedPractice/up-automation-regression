/// <reference types="cypress" />

class SideBarNavigate{
    
    public level1Selector: string = '.menu-level-1';
    public level2Selector: string = '.menu-level-2';
    public arrowSelector: string = '.hamburger-arrow-left';

    selectCalendar() : void {
        cy.get(this.level1Selector).eq(1).click();
    }

    extendMenu() : void{
        cy.get(this.arrowSelector).click()
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
        cy.intercept('https://staging.unifiedpractice.com/Public/Clinic/GetPatientPortalSettings').as('ppSettings')
        cy.get(this.level1Selector).eq(8).click();
        cy.wait('@ppSettings');
    }

    selectCS(name: string) : void {
        cy.get(this.level1Selector).eq(9).click();  
        cy.get(this.level2Selector).contains(name).click({force:true});

    }

    

}

export default SideBarNavigate
