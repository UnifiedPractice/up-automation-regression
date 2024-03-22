import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"


describe('Automation test for UP-902', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();


    it("UP-902", function () {

        login.goToStaging();
        login.loginAutomationUniversity();

        navigate.extendMenu();

        navigate.selectPP();
        pp.setToOn('Allow patients to book appointments online');
        pp.setToOn('Allow patient to cancel or reschedule an appointment online');
        pp.saveButton();

        pp.openPPUniveristy();
        pp.checkLogin();
        pp.proceedLogin();
        pp.bookNewAppointmentASAPonUniversities();
        pp.checkReschedule();
    })

})
