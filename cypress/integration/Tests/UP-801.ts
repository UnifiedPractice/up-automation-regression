import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations"
import BasePage from "../PageObject/base-page"
import DrawerModal from "../PageObject/drawer-modal"

describe('Automation test for UP-801', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();
    const drawerModal = new DrawerModal();

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
        login.loginPPNCFPCCPE();
        cy.contains('Login').click();
    

        cy.log('In Clinic Settings - Locations and rooms - Open one location that is inactive');
        navigate.selectCS('Locations');
        clinicLocations.chooseAutomation();

        cy.log('Set the slider Clinic Location is active? (ON)');
        cy.wait(1500);
        basePage.setToOn('Clinic location is active?');
        drawerModal.cancelButton();

        cy.log('Go to Clinic Settings - Patient Portal - Patient Portal URL');
        navigate.extendMenu();
        navigate.selectPP();
        pp.openPP();

        cy.log('Have you been to any of our clinics before? (Select YES)');
        pp.checkLogin();
        pp.selectRadio(1);
        pp.shouldBeVisible ('Automation Location')
      
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