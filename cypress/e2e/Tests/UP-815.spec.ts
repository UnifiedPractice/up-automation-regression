import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import DrawerModal from "../PageObject/drawer-modal"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"


describe('Automation test for UP-815', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const drawerModal = new DrawerModal();
    const clinicServices = new ClinicServices();

    it("UP-815", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Clinic Services');
        clinicServices.chooseService('Automation with CCPE');
        clinicServices.checkBoxSliderSetOff('#Service_IsActive');
        drawerModal.saveButton();
        
        navigate.extendMenu();
        navigate.selectPP();
        pp.openPP();

        pp.checkLogin();
        pp.selectRadio(1);
        pp.selectLocation('Automation Location')
        pp.shouldNotBeVisible('Automation with CCPE')
    })

})
