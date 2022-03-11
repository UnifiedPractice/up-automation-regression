//This class will be used for any test written throughout the project;
// the general methods are written here

/// <reference types="cypress" />

import { cloneWith } from "../../../node_modules/cypress/types/lodash/index";

class BasePage {

private formSelector: string = '.form-group';
private sliderSelector: string = '.checkboxSlider';

    setToOn(name: string): void {
        cy.get(this.formSelector).contains(name).parent().find(this.sliderSelector).then(($button) => {
            if ($button.hasClass('redClass')) {
                cy.get(this.formSelector).contains(name).parent().find(this.sliderSelector).click({force:true});
            } 
          })
    }
    
     setToOff(name: string): void {
        cy.get(this.formSelector).contains(name).parent().find(this.sliderSelector).then(($button) => {
            if ($button.hasClass('greenClass')) {
                cy.get(this.formSelector).contains(name).parent().find(this.sliderSelector).click({force:true});
            } 
          })
     }
}
export default BasePage
