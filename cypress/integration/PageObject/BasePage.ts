//This class will be used for any test written throughout the project;
// the general methods are written here

/// <reference types="cypress" />

import { cloneWith } from "../../../node_modules/cypress/types/lodash/index";

class BasePage {

public formSelector: string = '.form-group';
public sliderSelector: string = '.checkboxSlider';
public rightButtonsSelector: string = '.pull-right';

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

    //  setToOff2(name: string): void {
    //     cy.get('.checkboxSlider').parent().contains(name).then(($button) => {
    //         if ($button.hasClass('greenClass')) {
    //             cy.get('.checkboxSlider').parent().contains(name).click({force:true});
    //         } 
    //       })
    //  }

    setToOffService(name: string) : void {
        cy.get('#Service_IsActive').then(($ele) => {
            if ($ele.text().trim() == name) {
              cy.get('#Service_IsActive').click({force: true})
            } else if ($ele.text().trim() == name) {
              cy.get('#Service_AllowOnlineScheduling').click({force: true})
            }
          })
    //     cy.get(service).contains(name).parent().find(this.sliderSelector).then(($button) => {
    //         if ($button === 'Service is available') {
    //             cy.get('#Service_IsActive').click({force:true});
    //         }
    //         else if (name === 'Service is available'){}
    // })
}



    saveButton() : void {
        cy.get(this.rightButtonsSelector).eq(1).click({force:true});
        cy.wait(1500)
    }
    
    cancelButton() : void {
        cy.get(this.rightButtonsSelector).eq(0).click({force:true});
    }
}
export default BasePage
