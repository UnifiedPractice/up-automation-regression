/// <reference types="cypress" />

import { cloneWith } from "../../../node_modules/cypress/types/lodash/index";
import BasePage from "../PageObject/basePage"

const basePage = new BasePage();

class ClinicLocations{

 private location: string = '.footer-left-button';
 private rooms: string = '.footer-right-button';
 private editLocationButton : string ='.card-footer span:contains("Edit location")';
 private cardSelector : string = '.card-top-gradient';
 private cardLocations : string = '.card-locations';
 private addNewLocationSelector : string = '.js-pageActions';

 
 editLocation(value: number) : void { 
     cy.get(this.location).eq(value).click()
 }

 editRooms() : void { 
     cy.get(this.rooms)
 }



chooseAutomation(): void {

    cy.get('div.card').then($cards => {

        const cardExists = $cards.text().includes('Automation Location') 
      
        if (cardExists) {
          cy.contains('div.card', 'Automation Location') 
          .find(this.editLocationButton)
          .click({force:true})
        }
      })
      cy.wait(700);
    }

 remainOneActive() : void {

    cy.get(this.cardSelector).each((item, index) => {
            //cy.wrap(index)
            //cy.wait(2500);
            cy.wrap(item);

        cy.intercept('https://staging.unifiedpractice.com/Public/Clinic/EditLocation?locationId=*&_=*').as('editClinicLocation2');
            cy.contains('Edit location').click({force: true});

        cy.wait('@editClinicLocation2');
            //cy.wait(1660);
            cy.get('#addClinicLocation').should('exist');
            basePage.setToOff('Clinic location is active?')
            //cy.wait(1660);
            cy.intercept('https://staging.unifiedpractice.com/Public/Clinic/EditLocation').as('editClinicLocation');
            cy.intercept('https://staging.unifiedpractice.com/Public/Clinic/LocationList?_=*').as('getLocations');
            cy.get(basePage.rightButtonsSelector).eq(1).click({force:true})
            cy.wait('@editClinicLocation');
            cy.wait('@getLocations');
      });
      //cy.wait(1500)
      cy.contains('Edit location').first().click({force:true});
     cy.get('#addClinicLocation').should('exist');
      //cy.wait(1200)

     cy.intercept('https://staging.unifiedpractice.com/Public/Clinic/EditLocation').as('editClinicLocation');
     cy.intercept('https://staging.unifiedpractice.com/Public/Clinic/LocationList?_=*').as('getLocations');
      basePage.setToOn('Clinic location is active?')

     cy.wait('@editClinicLocation');
     cy.wait('@getLocations');
      //cy.wait(500)
      cy.get(basePage.rightButtonsSelector).eq(1).click({force:true})
      cy.get(this.cardLocations).eq(0).not('inactive')
 }

addNewLocation(): void { 
    cy.get(this.addNewLocationSelector).click();
}

}

export default ClinicLocations
