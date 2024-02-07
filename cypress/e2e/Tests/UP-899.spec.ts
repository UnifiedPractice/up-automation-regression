import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"


describe('Automation test for UP-899', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();


    it("UP-899", function () {

        login.goToStaging();
        login.loginAutomationUniversity();

        navigate.extendMenu();

        navigate.selectPP();
        pp.setToOn('Allow patients to book appointments online');
        pp.saveButton();

        pp.openPPUniveristy();
        pp.checkLogin();
        pp.proceedLogin();
        pp.bookNewAppointmentASAPonUniversities();

    })

})
