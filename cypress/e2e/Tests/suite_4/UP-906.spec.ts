import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import DrawerModal from "../../PageObject/drawer-modal"
import ClinicServices from "../../PageObject/clinic-settings/clinic-services"
import ClinicStaff from "../../PageObject/clinic-settings/clinic-staff";


describe('Automation test for UP-906', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const drawerModal = new DrawerModal();
    const clinicServices = new ClinicServices();
    const clinicStaff = new ClinicStaff();

 
    it("UP-906", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Clinic Services');
        clinicServices.chooseService('Automation with CCPE');

        drawerModal.clickOnDropdownUnmarkedRooms('Room 1')
        clinicServices.checkBoxSliderSetOn('#Service_IsActive');
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling');

        drawerModal.saveButton();

        navigate.extendMenu();
        navigate.selectPP();
        pp.openPP();

        pp.checkLogin();
        pp.selectRadio(1);
        pp.selectLocation('Automation Location')
        pp.shouldBeVisible('Automation with CCPE')
    })

})
