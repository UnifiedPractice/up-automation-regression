/// <reference types="cypress" />

import { cloneWith } from "../../../node_modules/cypress/types/lodash/index";

class AddClinicLocation{

private formSelector : string = '.form-control';


addDetails (name:string,details:string): void {
    cy.get('.form-group').contains(name).parent().find('.form-control').type(details);
}
}

export default AddClinicLocation