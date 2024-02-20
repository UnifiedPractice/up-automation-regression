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


describe('Automation test for UP-855', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicServices = new ClinicServices();
    const clinicStaff = new ClinicStaff();
    const drawerModal = new DrawerModal();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();

 
    it("UP-855", function () {
        cy.addTag('my-tag');
        login.goToStaging();
        login.loginAutomation();
        //THE TEST IS FOLLOWING AN OLD FLOW STRUCTURE FOR CREATING A NEW ACCOUNT;
        //THERE IS NO LONGER THE OPTION TO CHOOSE INSURANCE

        navigate.extendMenu();

        navigate.selectCS('Locations')
        clinicLocations.editLocation(0);
        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');
        drawerModal.saveButton();

        navigate.extendMenu()

        navigate.selectCS('Clinic Staff')
        clinicStaff.markUserActive('Automation Engineer')
        clinicStaff.markUserActive('Automation Another')
        clinicStaff.clickOnDetails('Automation Engineer')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.saveButton();

        navigate.extendMenu()

        navigate.selectCS('Clinic Services')
        clinicServices.chooseService('Automation with CCPE')
        clinicServices.checkBoxSliderSetOn('#Service_IsActive')
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling')
        clinicServices.clickOnDropdownUnmarkedPractitioners('Automation Tests')
        clinicServices.clickOnDropdownUnmarkedPractitioners('Automation Engineer')
        clinicServices.clickOnDropdownUnmarkedPractitioners('Automation Another')
        clinicServices.clickOnDropdownUnmarkedRooms('Room 1')
        drawerModal.saveButton();
        pp.shouldBeVisible('Clinic service saved')


        navigate.selectPP();
        pp.setToOn('Allow patients to book appointments online')
        pp.saveButton();
        pp.openPP();
        pp.checkLogin();
        pp.createAccountProceed();





    })

})
