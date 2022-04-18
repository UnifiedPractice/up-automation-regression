/// <reference types="cypress" />

import DrawerModal from "../drawer-modal";
 class ClinicLocations extends DrawerModal {

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
            cy.wait(2500).wrap(item);
            cy.contains('Edit location').click()
            cy.wait(1660);
            this.setToOff('Clinic location is active?')
            cy.wait(1660);
            cy.get(this.rightButtonsSelector).eq(1).click({force:true})
      });
            cy.wait(1500).contains('Edit location').first().click({force:true}).wait(1200);
            this.setToOn('Clinic location is active?')
            cy.wait(500).get(this.rightButtonsSelector).eq(1).click({force:true})
            cy.get(this.cardLocations).eq(0).not('inactive')
 }

addNewLocation(): void { 
    cy.get(this.addNewLocationSelector).click();
}

}

export default ClinicLocations