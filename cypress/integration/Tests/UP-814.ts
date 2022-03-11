import LoginPage from "../PageObject/LoginPage"
import SideBarNavigate from "../PageObject/SideBarMenu"
import PatientPortal from "../PageObject/PatientPortal"
import ClinicLocations from "../PageObject/ClinicLocations"
import ClinicServices from "../PageObject/ClinicServices"
import BasePage from "../PageObject/basePage"

describe('Automation test for UP-814', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicServices = new ClinicServices();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'sessionid', 'chatToken')
    })
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-814", function () {

        cy.log('Login to platform');
        login.goToStaging();
        cy.wait(1000)
        login.loginPPNCFPCCPE();
        cy.contains('Login').click();
    
        //It is desired to extend the test by disabling all but one location so that the test does not fail 
        //if there are one or more active locations in the patient portal before choosing the service.
        navigate.selectCS('Locations');
        clinicLocations.remainOneActive()
        navigate.extendMenu();

        cy.log('In Clinic Settings - Clinic Services - Edit one service that is inactive');
        navigate.selectCS('Clinic Services');
        cy.wait(1300);
        clinicServices.chooseService('Service with CCPE');
        cy.wait(2000);
        // cy.log('Go to Clinic Settings - Patient Portal - Patient Portal URL');
        // navigate.extendMenu();
        // navigate.selectPP();
        // pp.openPP();

        // cy.log('Have you been to any of our clinics before? (Select YES)');
        // pp.checkLogin();
        // pp.selectRadio(1);
        // pp.shouldBeVisible ('Select a service')
    })

})