/// <reference types="cypress" />

import { cloneWith } from "../../../../node_modules/cypress/types/lodash/index";

class ClinicServices {


private serviceSelector : string = '.'

private formSelector: string = '.form-group';
private sliderSelector: string = '.checkboxSlider';


chooseService(name:string) : void {

cy.get('.cmtContent-update').contains(name).parent().find('.col-sm-1').click();

}

// checkBoxSliderServiceSetOn(name: string): void {
//     cy.get(name).then(($button) => {
//         if ($button.hasClass('greenClass')) {
//             cy.get(name).click({force:true});
//         } 
//       })
//  }

checkBoxSliderServiceSetOn(name: string): void {
    cy.get(name).parent().click({force:true});
}





}

export default ClinicServices