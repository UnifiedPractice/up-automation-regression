/// <reference types="cypress" />

import { cloneWith } from "../../../../node_modules/cypress/types/lodash/index";
import BasePage from "../base-page"
import { DrawerModal } from "../drawer-modal";

const basePage = new BasePage();
const drawerModal = new DrawerModal();

 class ClinicLocations extends DrawerModal{

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
            cy.wait(2500);
            cy.wrap(item);
            cy.contains('Edit location').click()
            cy.wait(1660);
            basePage.setToOff('Clinic location is active?')
            cy.wait(1660);
            cy.get(drawerModal.rightButtonsSelector).eq(1).click({force:true})
      });
      cy.wait(1500)
      cy.contains('Edit location').first().click({force:true});
      cy.wait(1200)
      basePage.setToOn('Clinic location is active?')
      cy.wait(500)
      cy.get(drawerModal.rightButtonsSelector).eq(1).click({force:true})
      cy.get(this.cardLocations).eq(0).not('inactive')
 }

addNewLocation(): void { 
    cy.get(this.addNewLocationSelector).click();
}

}

export default ClinicLocations