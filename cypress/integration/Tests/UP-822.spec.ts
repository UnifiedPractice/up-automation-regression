import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"
import ClinicStaff from "../PageObject/clinic-settings/clinic-staff"
import DrawerModal from "../PageObject/drawer-modal";


describe('Automation test for UP-822', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicServices = new ClinicServices();
    const clinicStaff = new ClinicStaff();
    const drawerModal = new DrawerModal();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'sessionid', 'chatToken')
    })
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-822", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.selectCS('Clinic Services')
        clinicServices.chooseService('Automation with CCPE')
        clinicServices.checkBoxSliderSetOn('#Service_IsActive')
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling')
        clinicServices.clickOnDropdownUnmarkedPractitioners('Automation Tests')
        clinicServices.clickOnDropdownUnmarkedPractitioners('Automation Engineer')
        clinicServices.clickOnDropdownUnmarkedRooms('Room 1')
        drawerModal.saveButton();
        navigate.extendMenu();

        navigate.selectCS('Clinic Staff');
        clinicStaff.markUserActive('Automation Engineer')
        clinicStaff.chooseService('Automation Engineer');
        clinicStaff.clickOnDropdownUnmarked('Automation with CCPE')
        clinicStaff.saveButton();

        
        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.selectRadio(1);
        pp.selectLocation('Automation Location')
        pp.selectService('Automation with CCPE')
        pp.shouldBeVisible('Automation Engineer')
    })

})
