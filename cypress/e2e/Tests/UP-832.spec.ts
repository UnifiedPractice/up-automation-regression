import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicStaff from "../PageObject/clinic-settings/clinic-staff"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"
import DrawerModal from "../PageObject/drawer-modal";
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations";
import BasePage from "../PageObject/base-page";


describe('Automation test for UP-832', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicServices = new ClinicServices();
    const clinicStaff = new ClinicStaff();
    const drawerModal = new DrawerModal();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();

    it("UP-832", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Locations');
        clinicLocations.chooseAutomation();
        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');
        drawerModal.saveButton();

        navigate.extendMenu();

        navigate.selectCS('Clinic Staff');
        clinicStaff.clickOnDetails('Automation Tests')
        clinicServices.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicServices.checkBoxSliderSetOn('#PractitionerInfo_AutoAcceptAppointments')
        clinicStaff.saveButton();

        navigate.extendMenu();

        navigate.selectCS('Clinic Services')
        clinicServices.chooseService('Automation with CCPE')
        clinicServices.checkBoxSliderSetOn('#Service_IsActive')
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling')
        drawerModal.saveButton();
        pp.shouldBeVisible('Clinic service saved')

        navigate.extendMenu();

        navigate.selectCS('Clinic Staff');
        clinicStaff.clickOnDetails('Automation Engineer');
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AutoAcceptAppointments')
        clinicStaff.saveButton();

        navigate.extendMenu();
        navigate.selectCS('Clinic Staff');

        clinicStaff.markAllInactive();
        navigate.extendMenu();
        navigate.selectPP();
        pp.openPP();

        pp.checkLogin();
        pp.selectRadio(1);
        pp.selectLocation('Automation Location')
        pp.selectService('Automation with CCPE')
        pp.shouldBeVisible('Select an appointment date & time')

        //Cleaning
        pp.backtoEHR();
        navigate.extendMenu();
        navigate.selectCS('Clinic Staff');
        clinicStaff.markUserActive('Automation Engineer')
         })

})
