import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicStaff from "../PageObject/clinic-settings/clinic-staff"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"


describe('Automation test for UP-833', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicStaff = new ClinicStaff();
    const clinicServices = new ClinicServices();


    it("UP-833", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectPP();

        pp.setToOn('Allow patients to book appointments online');
        pp.saveButton();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.checkVisibilityBookAppointmentButton();
    })

})
