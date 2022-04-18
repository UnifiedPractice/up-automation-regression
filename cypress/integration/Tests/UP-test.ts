import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations"
import AddClinicLocation from "../PageObject/add-clinic-location-window"

describe('Automation test for UP-801', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();
    const addLocation = new AddClinicLocation();

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
        clinicLocations.addNewLocation();
        cy.wait(1500);
        addLocation.addDetails('Address','test22')
    })
})