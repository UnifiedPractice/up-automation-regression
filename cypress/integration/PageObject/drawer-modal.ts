import BasePage from "./base-page";
 class DrawerModal extends BasePage {

    private dropDownPractitionerSelectorID: string = '#SelectedPractitionersIds';
    private checkMarkSelector: string = '.check-mark';
    rightButtonsSelector: string = '.pull-right';


    saveButton() : void {
        cy.get(this.rightButtonsSelector).eq(1).click({force:true}).wait(1500);
    }
    
    cancelButton() : void {
        cy.get(this.rightButtonsSelector).eq(0).click({force:true});
    }

    clickOnDropdownMarked(name: string) {
        
        cy.wait(1200).get(this.dropDownPractitionerSelectorID).parent().click();

        cy.get(`${this.dropDownPractitionerSelectorID} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
          if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') > -1) {
            cy.wrap($button).click({force: true});      
          }
        });

    }

    clickOnDropdownUnmarked(name: string){
        
        cy.wait(1200).get(this.dropDownPractitionerSelectorID).parent().click();

        cy.get(`${this.dropDownPractitionerSelectorID} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
          if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == -1) {
            cy.wrap($button).click({force: true});      
          }
        });

    }

}

export default DrawerModal
