/// <reference types="cypress" />

import BasePage from "../base-page";

class ClinicServices extends BasePage {

 formSelector: string = '.form-group';
 sliderSelector: string = '.checkboxSlider';

checkBoxSliderServiceSetOn(name: string): void {
    cy.get(name).parent().click({force:true});
}

//Please make sure that here you will use in quotation marks
//the id of the checkbox you want to manipulate and not the text in front of it. 
//Because writing the project in a different way, this is an isolated
//situation where the id must be used (with # in front)
//For example : checkBoxSliderSetOn('#Service_IsTelehealth') and not
//checkBoxSliderSetOn('Telemedicine Service')
//The rule is mandatory for checkBoxSliderSetOff() method too.

checkBoxSliderSetOn(name: string): void {
    cy.get(name).parent().then(($button) => {
        if ($button.hasClass('redClass')) {
            cy.get(name).parent().click({force:true});
        } 
    })
}

checkBoxSliderSetOff(name: string): void {
    cy.get(name).parent().then(($button) => {
        if ($button.hasClass('greenClass')) {
            cy.get(name).parent().click({force:true});
        } 
    })
}
}

export default ClinicServices