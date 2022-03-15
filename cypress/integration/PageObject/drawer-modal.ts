import BasePage from "./base-page";

export class DrawerModal extends BasePage{

     rightButtonsSelector: string = '.pull-right';


    saveButton() : void {
        cy.get(this.rightButtonsSelector).eq(1).click({force:true});
        cy.wait(1500)
    }
    
    cancelButton() : void {
        cy.get(this.rightButtonsSelector).eq(0).click({force:true});
    }



}
