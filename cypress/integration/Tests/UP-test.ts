import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import DrawerModal from "../PageObject/drawer-modal"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"
import {format} from "date-fns";



describe('Automation test for UP-test', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const drawerModal = new DrawerModal();
    const clinicServices = new ClinicServices();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'sessionid', 'chatToken')
    })
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-test", function () {
        // const {format} = require('date-fns');
        // const date = new Date();
        // const today = format(date, 'dd')
        //
        // cy.visit('https://staging.unifiedpractice.com/dirlisting/d379136412c1476d9397f9ee3b606448/notifications')
        // cy.contains('emails').invoke('removeAttr', 'target').click();
        // cy.wait(500)
        // cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        // cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        // cy.get('a').contains('Verify email').click()
        // cy.get('.form-control').eq(3).type('TestFirstName')
        // cy.get('.form-control').eq(5).type('TestLastName')
        // cy.get('.form-control').eq(7).type(Math.floor(Math.random() * 123456789))
        // cy.get('.mat-select-value').eq(0).click().contains('Mobile').click()

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu()



    })
})
