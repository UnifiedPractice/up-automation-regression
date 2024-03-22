import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import PatientList from "../../PageObject/patient-list";
import ClinicServices from "../../PageObject/clinic-settings/clinic-services";
import BasePage from "../../PageObject/base-page";
import ClinicLocations from "../../PageObject/clinic-settings/clinic-locations";
import DrawerModal from "../../PageObject/drawer-modal";


describe('Automation test for UP-3565', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const patientList = new PatientList();
    const clinicServices = new ClinicServices();
    const drawerModal = new DrawerModal();
    const basePage = new BasePage();
    const clinicLocations = new ClinicLocations();


    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    //beforeEach(() => {
    //cy.session('ASP.NET_SessionId', 'sessionid', 'chatToken')
    //})
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-3565", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Clinic Services');
        clinicServices.chooseService('Automation with CCPE');
        clinicServices.checkBoxSliderSetOn('#Service_IsActive');
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling');
        drawerModal.saveButton();

        navigate.extendMenu();
        navigate.selectCS('Locations');
        clinicLocations.chooseAutomation();
        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');
        drawerModal.saveButton();

        navigate.selectAllClinicPatients();
        patientList.addNewPatientforMatchingError();

        navigate.selectPP();
        pp.setToOn('Allow patients to book appointments online');
        pp.setToOn('Chat messages for your patients available in Patient Portal (file sharing remains available)')
        pp.saveButton();

        pp.openPP();
        pp.checkLogin();
        //pp.proceedForMatchingError();

    })

})
