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
import PatientList from "../PageObject/patient-list";

describe('Automation test for UP-874', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const patientList = new PatientList();
    const clinicServices = new ClinicServices();
    const clinicStaff = new ClinicStaff();
    const drawerModal = new DrawerModal();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();

    //const randomNa= new randomNameMemo;

 
    it("UP-874", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu()

        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.selectCompleteFormsAndCompleteContactInformation()
        pp.backtoEHR();

        navigate.extendMenu()

        navigate.selectAllClinicPatients();
        patientList.searchPatient('Automation Engineer')
        patientList.goToPersonalTab()
        patientList.checkVisibilityPersonalDetails('Bucharest Ilfov')

    })

})
