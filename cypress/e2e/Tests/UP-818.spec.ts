import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import DrawerModal from "../PageObject/drawer-modal"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"


describe('Automation test for UP-818', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const drawerModal = new DrawerModal();
    const clinicServices = new ClinicServices();

    it("UP-818", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Clinic Services');
        clinicServices.chooseService('Automation with CCPE');
        drawerModal.clickOnDropdownMarked('Automation Tests')
        clinicServices.checkBoxSliderSetOn('#Service_IsActive');
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling')
        drawerModal.saveButton();
        
        navigate.extendMenu();
        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.selectRadio(1);
        pp.selectLocation('Automation Location')
        pp.selectService('Automation with CCPE')
        pp.shouldNotBeVisible('John')
    })

})
