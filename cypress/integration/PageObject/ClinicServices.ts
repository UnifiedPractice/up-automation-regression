/// <reference types="cypress" />

import { cloneWith } from "../../../node_modules/cypress/types/lodash/index";

class ClinicServices {


private serviceSelector : string = '.'


chooseService(name:string) : void {

cy.get('.cmtContent-update').contains(name).parent().find('.col-sm-1').click();

}





}

export default ClinicServices