import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"
import ClinicStaff from "../PageObject/clinic-settings/clinic-staff"
import basePage from "../PageObject/base-page";
import drawerModal from "../PageObject/drawer-modal";
import DrawerModal from "../PageObject/drawer-modal";
import patientPortal from "../PageObject/patient-portal";
import BasePage from "../PageObject/base-page";
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations";


describe('Automation test for UP-897', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicServices = new ClinicServices();
    const clinicStaff = new ClinicStaff();
    const drawerModal = new DrawerModal();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();

 
    it("UP-897", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Clinic Staff')
        clinicStaff.clickOnDetails('Automation Engineer')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.checkBoxSliderSetOff('#PractitionerInfo_AutoAcceptAppointments')

        clinicStaff.saveButton();


        navigate.extendMenu()

        navigate.selectPP();
        pp.setToOn('Allow patients to book appointments online')
        pp.setToOn('Allow patient to cancel or reschedule an appointment online')
        pp.saveButton();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.bookNewAppointmentAutomationEngineer();
        pp.goToStagingEmailandRejectAppointment();

        //Cleaning

        pp.backtoEHR();
        navigate.extendMenu()
        navigate.selectCS('Clinic Staff')
        clinicStaff.clickOnDetails('Automation Engineer')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AutoAcceptAppointments')
        clinicStaff.saveButton();

    })

})
