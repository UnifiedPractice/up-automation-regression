import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import PatientList from "../PageObject/patient-list";

describe('Automation test for UP-880', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const patientList = new PatientList();

 
    it("UP-880", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu()

        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.selectCompleteFormsAndCompleteMedicalInformation()

    })

})
