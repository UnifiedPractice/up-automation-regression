/// <reference types="cypress" />

import BasePage from "../base-page";

class ClinicStaff extends BasePage {

 formSelector: string = '.form-group';
 sliderSelector: string = '.checkboxSlider';
 buttonSelector: string= '.button';
 serviceSelector: string = '#selectedServices';

chooseService(name:string) : void {
cy.get('.cmtContent-update').contains(name).parent().find('.col-sm-1').click();
}

saveButton() : void {
    cy.get(this.buttonSelector).click({force:true});
}

checkBoxSliderServiceSetOn(name: string): void {
    cy.get(name).parent().click({force:true});
}

clickOnDropdownUnmarked(name: string){
        
    cy.wait(1200).get(this.serviceSelector).parent().click();

    cy.get(`${this.serviceSelector} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
      if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == -1) {
        cy.wrap($button).click({force: true});      
      }
    });

}


clickOnDropdownMarked(name: string){
        
    cy.wait(1200).get(this.serviceSelector).parent().click();

    cy.get(`${this.serviceSelector} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
      if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == 0) {
        cy.wrap($button).click({force: true});      
      }
    });

}
}

export default ClinicStaff