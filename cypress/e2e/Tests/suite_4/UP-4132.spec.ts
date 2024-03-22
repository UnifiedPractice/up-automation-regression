import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import patientList from "../../PageObject/patient-list";


describe('Automation test for UP-4132', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();

 
    it("UP-4132", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectPP();
        pp.setToOn('Allow patients to book appointments online');
        pp.setToOn('Chat messages for your patients available in Patient Portal (file sharing remains available)')
        pp.saveButton();

        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.openChat();
        pp.openChatwithFrontdesk();


    })

})
