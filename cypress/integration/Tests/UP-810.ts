import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations"

describe('Automation test for UP-810', () => {
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
    it("UP-810", function () {

        cy.log('Login to platform');
        login.goToStaging();
        login.loginPPNCFPCCPE();
        cy.contains('Login').click();

        cy.log('In Clinic Settings - Locations and rooms - Open one location that is inactive');
        navigate.selectCS('Locations');
        clinicLocations.remainOneActive()

        cy.log('Go to Clinic Settings - Patient Portal - Patient Portal URL');
        navigate.extendMenu();
        navigate.selectPP();
        pp.openPP();

        cy.log('Have you been to any of our clinics before? (Select YES)');
        pp.checkLogin();
        pp.selectRadio(1);
        pp.shouldBeVisible ('Select a service')
    })

})