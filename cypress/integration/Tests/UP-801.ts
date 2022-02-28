import LoginPage from "../PageObject/LoginPage"
import SideBarNavigate from "../PageObject/SideBarMenu"
import PatientPortal from "../PageObject/PatientPortal"
import ClinicLocations from "../PageObject/ClinicLocations"

describe('Automation test for UP-801', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'sessionid', 'chatToken')
    })
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-801", function () {

        cy.log('Login to platform');
        login.goToStaging();
        cy.wait(1000)
        login.loginPPNCFPCCPE();
        cy.contains('Login').click();
    

        cy.log('In Clinic Settings - Locations and rooms - Open one location that is inactive');
        navigate.selectCS('Locations');
        cy.wait(1300);
        //clinicLocations.editLocation(0);
        //cy.wait(2500);
        clinicLocations.chooseAutomation();

        cy.log('Set the slider Clinic Location is active? (ON)');
        cy.get('label[for="inputType"]').contains('Clinic location is active?')
        // clinicLocations.setToOn(0);
        // cy.wait(2000);
        // clinicLocations.saveButton();
        // cy.log('Go to Clinic Settings - Patient Portal - Patient Portal URL');
        // navigate.extendMenu();
        // navigate.selectPP();
        // pp.openPP();

        // cy.log('Have you been to any of our clinics before? (Select YES)');
        // pp.checkLogin();
        // pp.selectRadio(1);
        // pp.shouldBeVisible ('Automation Location')
      
    })



       // pp.openPP();
       // pp.checkLogin();
        //pp.loginCredentials('testalex12@test.com','password')
        //pp.pressLogin();
       // pp.checkSuccessLogin();
    

          // END OF UP-801


    // it("UP-802", function() {
    //     const pp = new PatientPortal() ;
    //     const navigate = new SideBarNavigate();
    //     const clinicLocations = new ClinicLocations();
    //     const login = new LoginPage();

    //     login.goToStaging();
    //     login.loginPPNCFPCCPE();
    //     cy.contains('Login').click();
    //     navigate.selectCS('Locations');
    //     cy.wait(1300);
    //             //clinicLocations.editLocation(0);
    //             //cy.wait(2500);
    //     clinicLocations.chooseAutomation();
    //     clinicLocations.setToOff(0);
    //     clinicLocations.saveButton();
    //     navigate.extendMenu();
    //     navigate.selectPP();
    //     pp.openPP();
    //     pp.checkLogin();
    //     pp.selectRadio(1);
    //     pp.shouldNotBeVisible('Automation Location')
        

    // })

})