/// <reference types="cypress" />

import {PP_API, PP_API_URL, FINAL_API, API_URL, API_BASEPP_URL, FINAL_API_STAGING_PP} from "../../constants";
import BasePage from "./base-page";
import 'cypress-wait-until';
import { format, addDays} from 'date-fns';
const { uniqueNamesGenerator, Config, adjectives, colors } = require('unique-names-generator');

class PatientPortal extends BasePage {

    private radioSelector: string = '.md-radio';
    private formControl: string = '.form-control';
    private loginButton: string = '.btn-login';
    private radioTabSelector: string = '.md-radio-tab';
    private randomize: any;
    private buttonSelector: string = 'o-button';
    private messageSuccess: string = 'Settings saved successfully';

    const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, colors],
        length: 2,
        separator: ' ',
        style: 'capital'
    });

    openPP(): void {
        cy.intercept(`${FINAL_API_STAGING_PP()}`).as('ppOrganization');
        cy.contains('https://pp.staging.unifiedpractice.com/automation').should('be.visible').get('.label-pp-url').eq(1).invoke('removeAttr', 'target').click()
        cy.wait('@ppOrganization');
        //It is desired to eliminate this wait, but sometimes in tests the intercept is not enough
        cy.wait(1500)
    }

    saveButton(): void {
        cy.contains('Save').click();
        cy.contains(this.messageSuccess).should('be.visible');
    }

    selectRadio(value: number): void {
        cy.get(this.radioSelector).eq(value).click();
    }

    chooseRandomHour(): void {
        this.randomize = Math.floor(Math.random() * this.radioTabSelector.length)
        cy.get(this.radioTabSelector).eq(this.randomize).click();
        }

    //Need to be improved with intercept
    interceptAndWaitForAvailabilities(): void{
            cy.wait(500)
            // cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Availabilities?LocationGuid=*').as('hour')
            // cy.wait('@hour')
        }

    loginCredentials(email,password): void {
        cy.get(this.formControl).eq(0).type(email);
        cy.get(this.formControl).eq(1).type(password);
    }
    
    selectLocation(name: string) : void { 
        cy.contains(name).click();
    }

    selectService(name: string) : void { 
        cy.contains(name).click();
    }

    selectPractitioner(name: string) : void { 
        cy.contains(name).click();
    }

    pressLogin(): void {
        cy.get(this.loginButton).click();
    }

    checkSuccessLogin() : void {
        cy.contains('Upcoming').should('be.visible');
    }

    proceedLogin() : void {
        cy.get('.inp').eq(0).click().type('automation2@email.com');
        cy.contains('Password').parent().click().type('password');
        cy.get('.login-btn.mat-flat-button.mat-primary').click();
    }

    checkLogin() {
        cy.get('.burger-menu').click();
        cy.get('.mat-menu-item').then(($el) => {
            if($el.text().includes('Logout')){
                cy.get('.burger-menu').click({force:true});
                cy.contains('Logout').click({force:true});
                cy.wait(700);
            }
            cy.get('.logo-symbol').click({ force: true })
            cy.get('.mat-menu-content').click();
        })
          }

        shouldBeVisible(name: string): void {
            cy.wait(500).contains(name).should('be.visible')
        }

        shouldNotBeVisible(name: string): void {
            cy.wait(500).contains(name).should('not.exist')
        }

    setToOff(name:string): void {
        cy.contains('div', name)
            .parent()
            .within(() => {
                cy.get('input[type="checkbox"]').uncheck({force: true})
            })
    }

    setToOn(name:string): void {
        cy.contains('div', name)
            .parent()
            .within(() => {
                cy.get('input[type="checkbox"]').check({force: true})
            })
    }

        checkAvailability(): void {
           this.interceptAndWaitForAvailabilities();
            cy.get('.select-box').then($box => {
                const noAvailability = $box.text().includes('No time slots available. Please change interval or select another practitioner.')
                if (noAvailability) {
                    //this.interceptAndWaitForAvailabilities();
                    cy.wait(400)
                    cy.contains('Next week').click();
                    console.log('checkav2')
                }
        }
            )}

        //Please make sure before you use this method, that in your test there is the flow for the 'Automation Location' location to be active.
        // If this detail is ignored, the test may break.

        bookNewAppointment(): void {
            cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
            cy.contains('Book Appointment').click({force:true});
            this.checkLocationsNumber();
            cy.contains('Automation with CCPE').click();
            this.checkPractitionersNumber();
            this.checkAvailability();
            cy.contains('Select an appointment').should('be.visible')
            cy.get(this.radioTabSelector).eq(Math.floor(Math.random() * this.radioTabSelector.length)).click({force:true})
            cy.contains('Confirm Appointment').click();
            cy.contains('Your appointment was successfully booked').should('be.visible');
            cy.contains('Dashboard').click()
        }

    bookNewAppointmentASAP(): void {
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        this.checkLocationsNumber();
        cy.wait(500)
        cy.contains('Automation with CCPE').click();
        this.checkPractitionersNumber();
        this.checkAvailability();
        cy.contains('Select an appointment').should('be.visible')
        cy.get(this.radioTabSelector).eq(0).click({force:true})
        cy.wait(1000)
        cy.contains('Confirm Appointment').click();
        cy.contains('Your appointment was successfully booked').should('be.visible');
        cy.contains('Dashboard').click()
    }

    bookNewAppointmentASAPAutomationWithCCPE(): void{
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        this.checkLocationsNumber();
        cy.wait(500)
        cy.contains('Automation with CCPE').click();
        this.checkPractitionersNumber();
        this.checkAvailability();
        cy.contains('Select an appointment').should('be.visible')
        cy.wait(400)
        cy.get(this.radioTabSelector).eq(0).click({force:true})
        cy.wait(1000)
        cy.contains('Confirm Appointment').click();
        cy.contains('Your appointment was successfully booked').should('be.visible');
        cy.contains('Dashboard').click()
    }

    checkPractitionersNumber(): void {
        //this.interceptAndWaitForAvailabilities();
        cy.get('.select-box').then($box => {
            const moreThanOne = $box.text().includes('Select practitioner')
            if (moreThanOne) {
               // this.interceptAndWaitForAvailabilities();
                cy.contains('Automation Engineer').click();
            }
        })
    }

    checkLocationsNumber(): void {
        cy.wait(800)
        console.log('checkprac1')
        //this.interceptAndWaitForAvailabilities();
        cy.get('.select-box').then($box => {
            const moreThanOne = $box.text().includes('Select a location')
            if (moreThanOne) {
                // this.interceptAndWaitForAvailabilities();
                cy.get('.row-md-radio').children().contains('Automation Location').click({force:true});
                console.log('checkpract2')
            }
        })
    }

    textInBox(parent:string, value: string): void {
        cy.contains('div', parent)
            .parent() //Moves to parent div row
            .within(() => { //scopes the commands within the above div row
                cy.get('.form-control').click().clear().type(value);
            })
    }

    //Another intercept would be ideal in this method
    checkVisibilityUpcoming(): void {
        cy.wait(1500)
        cy.get('.mat-flat-button.mat-primary.mat-button-base').then($button => {
            if($button.text().includes('Show more upcoming')) {
                cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments?Direction=2&Take=6&Skip=*').as('upcoming')
                cy.contains('Show more upcoming').click()
                cy.wait('@upcoming')
                    .then(() => this.checkVisibilityUpcoming())
            }
        })
    }

    checkForNoPreferenceStateOn(): void{
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        this.checkLocationsNumber();
        cy.contains('Automation with CCPE').click();
        cy.contains('have a preference').should('be.visible')
    }

    checkForNoPreferenceStateOff(): void{
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        this.checkLocationsNumber();
        cy.contains('Automation with CCPE').click();
        cy.contains('have a preference').should('not.exist')
    }

    roundAvailabilities(name: string): void{
        cy.get('.dx-dropdowneditor-icon').click();
        cy.contains(name).click({force:true});
    }

    checkRoundAvailabilities(): void{
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        cy.wait(400)
        this.checkLocationsNumber();
        cy.wait(400)
        cy.contains('Automation with CCPE').click();
        this.checkPractitionersNumber();
        this.checkAvailability();
        cy.contains('Select an appointment').should('be.visible')
    }

    setAvailabilitiesIntervalToCheckFor30Minutes(): void {
        cy.contains(':00').should('be.visible');
        cy.contains(':30').should('be.visible');
        cy.contains(':15').should('not.exist');
        cy.contains(':45').should('not.exist');
    }

    setAvailabilitiesIntervalToCheckFor15Minutes(): void {
        cy.contains(':00').should('be.visible');
        cy.contains(':30').should('be.visible');
        cy.contains(':15').should('be.visible');
        cy.contains(':45').should('be.visible');
    }


    setAvailabilitiesIntervalToCheckFor60Minutes(): void {
        cy.contains(':00').should('be.visible');
        cy.contains(':30').should('not.exist');
        cy.contains(':15').should('not.exist');
        cy.contains(':45').should('not.exist');
    }

    checkTodayToBeHidden(): void{
        var todaysDate = format(new Date(), "MMMM dd")
        cy.get('.calendar-row').contains(todaysDate).should('not.exist')
    }

    checkFeature30Days(): void{
        const today = new Date();
        var featureDay = format ( addDays (today, 30), "MMMM dd")
        console.log(featureDay)

        cy.get('.calendar-row').then(($el) => {
            const oneMonth = $el.text().includes(featureDay)
            console.log($el.text())
            if(!oneMonth){
                cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Availabilities?LocationGuid=*').as('next')
                cy.wait(500)
                cy.contains('span', 'Next week').click()
                cy.wait('@next')
                    .then( () =>this.checkFeature30Days() )

            }
            this.checkFeature30Days();

        })
    }

    checkReschedule(): void{
        cy.contains('Reschedule').eq(0).click();
        cy.wait(500)
        cy.get(this.radioTabSelector).eq(0).click({force:true})
        cy.wait(500)
        cy.contains('Confirm Appointment').click();
        cy.contains('Your appointment was successfully rescheduled').should('be.visible');
        cy.contains('Dashboard').click()
    }

    cancelAppointment(): void{
        cy.contains('Cancel').eq(0).click();
        cy.wait(500)
        cy.get('.textarea-modal').type('Reason for cancel text')
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments/*/cancel').as('cancel')
        cy.contains('Cancel Appointment').click()
        cy.wait('@cancel')
        cy.wait(500)
        cy.contains('Cancel').should('not.be.visible')

    }

    checkRescheduleWithNoLocationAvailable(): void{
        cy.contains('Reschedule').eq(0).click();
        cy.contains('The location you selected is no longer available. Please select another location from the list below').should('be.visible');

    }

    checkRescheduleWithNoServiceAvailable(): void{
        cy.contains('Reschedule').eq(0).click();
        cy.contains('The service you selected is no longer available. Please select another service from the list below').should('be.visible');

    }

    //Need to be improved with intercept()
    checkBookSimilarWithNoLocationAvailable(): void{
        cy.wait(1200)
        cy.contains('Book Similar').eq(0).click();
        cy.contains('The location you selected is no longer available. Please select another location from the list below').should('be.visible');
    }

    checkBookSimilarWithNoServiceAvailable(): void{
        cy.contains('Book Similar').eq(0).click();
        cy.contains('The service you selected is no longer available. Please select another service from the list below').should('be.visible');
    }

    checkRescheduleWithNoPractitionerAvailable() : void{
        cy.wait(400)
        cy.contains('Reschedule').eq(0).click();
        cy.contains('The practitioner you selected is no longer available. Please select another practitioner from the list below').should('be.visible')
    }

    checkBookSimilarWithNoPractitionerAvailable() : void{
        cy.contains('Book Similar').eq(0).click();
        cy.contains('The practitioner you selected is no longer available. Please select another practitioner from the list below').should('be.visible');
    }

    createAccountProceed() : void {
        cy.contains('first time patient').click();
        cy.contains('Automation with CCPE').click();
        this.checkPractitionersNumber()
        this.checkAvailability();
        cy.contains('Select an appointment').should('be.visible')
        cy.wait(500)
        cy.get(this.radioTabSelector).eq(0).click({force:true})
        cy.wait(1000)
        cy.contains('Create Account').click();
        cy.get('.email-input').click().type('test' + (Math.floor(Math.random() * 1000)) + '@test.com' );
        cy.get('.mat-button-wrapper').contains('Create Account').click();
        cy.visit('https://staging.unifiedpractice.com/dirlisting/d379136412c1476d9397f9ee3b606448/notifications')
        cy.contains('emails').invoke('removeAttr', 'target').click();
        cy.wait(500)
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').contains('Verify email').click()
        cy.get('.form-control').eq(1).type('TestFirstName')
        cy.get('.form-control').eq(2).type('TestLastName')
        cy.get('.form-control').eq(3).type(Math.floor(Math.random() * 123456789))
        cy.get('.mat-select-value').eq(0).click()
            cy.get('.mat-option-text').eq(1).click()
        cy.get('.mat-select-value').eq(1).click()
            cy.get('.mat-option-text').eq(Math.floor(Math.random() * 60)+1).click()
        cy.get('.mat-select-value').eq(2).click()
            cy.get('.mat-option-text').eq(Math.floor(Math.random() * 10)+1).click()
        cy.get('.mat-select-value').eq(3).click()
            cy.get('.mat-option-text').eq(Math.floor(Math.random() * 27)+1).click()
        cy.get('.mat-select-value').eq(4).click()
            cy.get('.mat-option-text').eq(1).click()
        cy.get('.mat-checkbox-inner-container').click();
        cy.get('.form-control').eq(9).click().clear().type('password')
        cy.get('.form-control').eq(10).click().clear().type('password')
        cy.contains('Continue').click().wait(800)
        cy.contains('Appointment summary').should('be.visible')
        cy.get('.btn-primary').click()
        cy.contains('Dashboard').click();
    }

    completeField(name: string, content: any): void
    {
        cy.contains(name).next().clear().type(content);
    }

    //Method only for new accounts created
    completeAllForms(): void{
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Locations').as('loc')
        cy.contains('Complete Forms').click();
        cy.get('.col-12.edit-col').eq(0).click()
        cy.wait('@loc')

        //Patient Information - Not finished
        this.completeField('First Name', this.randomName)
        this.completeField('Middle Name', this.randomName)
        this.completeField('Last Name',this.randomName)
        cy.get('.mat-select-value').eq(0).click()
            cy.get('.mat-option-text').eq(Math.floor(Math.random() * 60)+1).click().wait(300)
        cy.get('.mat-select-value').eq(1).click()
            cy.get('.mat-option-text').eq(Math.floor(Math.random() * 10)+1).click().wait(300)
        cy.get('.mat-select-value').eq(2).click()
            cy.get('.mat-option-text').eq(Math.floor(Math.random() * 26)+1).click()
        cy.get('.mat-select-value').eq(3).click()
            cy.get('.mat-option-text').eq(1).click()
        this.completeField('Occupation','Engineer')
        cy.get('.mat-select-value').eq(4).click()
            cy.get('.mat-option-text').eq(1).click()
        cy.get('.mat-select-value').eq(5).click()
            cy.get('.mat-option-text').eq(1).click()
        cy.contains('Save').click()

        //Address & Contact Information
        this.completeField('Street Address', this.randomName)
        this.completeField('Street Address Line 2', this.randomName)

        cy.get('.form-control').eq(2).click().clear().type(Math.floor(Math.random() * 123456789))
        cy.get('.mat-select-value-text').eq(0).click()
            cy.get('.mat-option-text').eq(1).click()

        cy.get('.form-control').eq(4).click().clear().type(Math.floor(Math.random() * 123456789))
        cy.get('.mat-select-placeholder').eq(0).click()
            cy.get('.mat-option-text').eq(1).click()

        cy.get('.mat-select-value').eq(2).click()
            cy.get('.mat-option-text').eq(Math.floor(Math.random() * 30)).click()
        this.completeField('State', this.randomName)
        this.completeField('City', this.randomName)
        this.completeField('Zip Code', Math.floor(Math.random() * 123456))
        this.completeField('Fax Number', Math.floor(Math.random() * 999999))
        cy.contains('Save').click()

        //Emergency Contact Information
        cy.get('.col-12.edit-col').eq(2).click()

        this.completeField('Contact Name', this.randomName)
        this.completeField('Email', 'test@test.com')
        this.completeField('Contact Phone Number', Math.floor(Math.random() * 9999999))
        this.completeField('Alternate Phone', Math.floor(Math.random() * 9999999))
        cy.get('.mat-select-value').eq(0).click()
            cy.get('.mat-option-text').eq(Math.floor(Math.random() * 7)).click()
        cy.contains('Save').click()
        cy.wait(300)
        cy.contains('Save').click()
        cy.wait(300)
        cy.contains('Save').click()
        cy.wait(300)
        cy.contains('Save').click()
        cy.wait(300)
        cy.contains('Dashboard').click();
    }


}

export default PatientPortal
