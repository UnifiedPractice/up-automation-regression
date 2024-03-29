import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"
import DrawerModal from "../PageObject/drawer-modal"


describe('Automation test for UP-827', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicServices = new ClinicServices();
    const drawerModal = new DrawerModal();

    it("UP-827", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Clinic Services');
        clinicServices.chooseService('Automation with CCPE');
        drawerModal.clickOnDropdownUnmarked('Automation Engineer')
        clinicServices.checkBoxSliderSetOn('#Service_IsActive');
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling');
        drawerModal.saveButton();
        
        navigate.extendMenu();
        navigate.selectPP();
        pp.openPP();

        pp.checkLogin();
        pp.selectRadio(1);
        pp.selectLocation('Automation Location')
        pp.selectService('Automation with CCPE')
        pp.shouldBeVisible('Automation Engineer')
    })

})
