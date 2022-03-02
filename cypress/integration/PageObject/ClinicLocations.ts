/// <reference types="cypress" />

class ClinicLocations{
 private location: string = '.footer-left-button';
 private rooms: string = '.footer-right-button';
 private controlsSelector: string = '.checkboxSlider';
 private rightButtonsSelector: string = '.pull-right';
 private offSliderButton : string ='.redClass'; 
 private onSliderButton : string ='.change';
 private editLocationButton : string ='.card-footer span:contains("Edit location")'
 
 editLocation(value: number) : void { 
     cy.get(this.location).eq(value).click()
 }

 editRooms() : void { 
     cy.get(this.rooms)
 }

saveButton() : void{
    cy.get(this.rightButtonsSelector).eq(1).click({force:true});
    cy.wait(1500)
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
          .click({force:true})
        }
      })
      cy.wait(700);
    }


setToOn(name: string) {
    cy.get('.form-group').contains(name).parent().find('.checkboxSlider').then(($button) => {
        if ($button.hasClass('redClass')) {
            cy.get('.form-group').contains(name).parent().find('.checkboxSlider').click({force:true});
        } 
      })
}

 setToOff(name: string): void {
    cy.get('.form-group').contains(name).parent().find('.checkboxSlider').then(($button) => {
        if ($button.hasClass('greenClass')) {
            cy.get('.form-group').contains(name).parent().find('.checkboxSlider').click({force:true});
        } 
      })
 }
}

export default ClinicLocations