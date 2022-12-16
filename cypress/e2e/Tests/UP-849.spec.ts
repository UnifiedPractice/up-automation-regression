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


describe('Automation test for UP-849', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicServices = new ClinicServices();
    const clinicStaff = new ClinicStaff();
    const drawerModal = new DrawerModal();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    //beforeEach(() => {
        //cy.session('ASP.NET_SessionId', 'sessionid', 'chatToken')
    //})
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-849", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.selectCS('Locations')
        clinicLocations.editLocation(0);
        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');
        drawerModal.saveButton();

        navigate.extendMenu()

        navigate.selectCS('Clinic Services')
        clinicServices.chooseService('Automation with CCPE')
        clinicServices.checkBoxSliderSetOn('#Service_IsActive')
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling')
        clinicServices.clickOnDropdownUnmarkedPractitioners('Automation Tests')
        clinicServices.clickOnDropdownUnmarkedPractitioners('Automation Engineer')
        clinicServices.clickOnDropdownUnmarkedRooms('Room 1')
        drawerModal.saveButton();
        pp.shouldBeVisible('Clinic service saved')

        navigate.selectPP();
        pp.setToOn('Allow patients to book appointments online')
        pp.setToOn('Allow patient to cancel or reschedule an appointment online')
        pp.saveButton();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.bookNewAppointmentASAPAutomationWithCCPE();

        basePage.backtoEHR()

        navigate.selectCS('Locations')
        clinicLocations.editLocation(0);
        basePage.setToOff('Clinic location is active?');
        basePage.setToOff('Allow Online Scheduling?');
        drawerModal.saveButton();

        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.checkVisibilityUpcoming();
        pp.checkBookSimilarWithNoLocationAvailable();

        //Cleaning

        basePage.backtoEHR()
        navigate.selectCS('Locations')
        clinicLocations.editLocation(0);
        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');
        drawerModal.saveButton();

    })

})
