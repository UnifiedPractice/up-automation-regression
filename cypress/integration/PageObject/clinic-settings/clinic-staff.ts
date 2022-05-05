/// <reference types="cypress" />

import BasePage from "../base-page";

class ClinicStaff extends BasePage {

 formSelector: string = '.form-group';
 sliderSelector: string = '.checkboxSlider';
 buttonSelector: string= '.button';
 serviceSelector: string = '#selectedServices';
 staffSelector: string = '.row';
 actionSelector: string = '.js-linkToggleUserStatus';
 checkboxSelector: string = '.js-checkboxIncludeInactiveUsers';
 statusSelector: string = '.js-labelPersonStatus';
 statusTest: any;
 saveSelector: string = '.button.default';

 
chooseService(name:string) : void {
    cy.get('.cmtContent-update').contains(name).parent().find('.col-sm-1').click();
}

saveButton() : void {
    cy.get(this.saveSelector).click({force:true});
}


checkBoxSliderServiceSetOn(name: string): void {
    cy.get(name).parent().click({force:true});
}


markAllInactive () : void {
  cy.wait(600).get('.js-linkToggleUserStatus').each((item) => {
    const cardExists = item.text().includes('Mark user as inactive') 
    if (cardExists) {
      cy.wrap(item)
      .contains('Mark user as inactive')
      .click({force:true})
    }    
  })
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

markUserActive(name: string){ 
  cy.get(this.checkboxSelector).click().wait(800);
  cy.get(this.staffSelector).contains(name).then(($button) => {
    if ($button.parent().hasClass('inactive-user')) {
        cy.get(this.staffSelector).contains(name).parent().find(this.actionSelector).click({force:true});
    } 
  })
}

markUserInactive(name: string){ 
  cy.get(this.staffSelector).contains(name).then(($button) => {
    if (!$button.parent().hasClass('inactive-user')) {
        cy.get(this.staffSelector).contains(name).parent().find(this.actionSelector).click({force:true});
    } 
  })
}

clickOnDetails(name : string){
  cy.wait(800).get(this.staffSelector).contains(name).parent().contains('Details').click()
}

}

export default ClinicStaff