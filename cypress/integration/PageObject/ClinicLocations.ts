/// <reference types="cypress" />

class ClinicLocations{
 public location: string = '.footer-left-button';
 public rooms: string = '.footer-right-button';
 public addLocation: string = '';
 public controlsSelector: string = '.checkboxSlider';
 public rightButtonsSelector: string = '.pull-right';
 public offSliderButton : string ='.redClass'; 
 public onSliderButton : string ='.change';
 public editLocationButton : string ='.card-footer span:contains("Edit location")'
 
 editLocation(value: number) : void { 
     cy.get(this.location).eq(value).click()
 }

 editRooms() : void { 
     cy.get(this.rooms)
 }

saveButton() : void{
    cy.get(this.rightButtonsSelector).eq(1).click({force:true});
    cy.wait(2500)
}

cancelButton() : void{
    cy.get(this.rightButtonsSelector).eq(0).click({force:true});
}

chooseAutomation(): void {

    cy.get('div.card').then($cards => {

        const cardExists = $cards.text().includes('Automation Location') 
      
        if (cardExists) {
          cy.contains('div.card', 'Automation Location') 
          .find(this.editLocationButton)
          .click()
        }
      })
      cy.wait(2000);
    }

setToOn(value: number) {
    cy.get(this.controlsSelector).eq(value).then(($button) => {
        if ($button.hasClass('redClass')) {
            cy.get(this.offSliderButton).eq(value).click({force:true});
        } 
      })
}

 setToOff(value: number): void {
    cy.get(this.controlsSelector).eq(value).then(($button) => {
    if ($button.hasClass('greenClass')) {
        cy.get(this.onSliderButton).eq(value).click({force:true});
    } 
  })
 }



}

export default ClinicLocations