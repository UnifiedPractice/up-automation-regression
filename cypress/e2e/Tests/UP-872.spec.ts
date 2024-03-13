import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"


describe('Automation test for UP-872', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();

 
    it("UP-872", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.extendMenu()
        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.forgotPassword();
    })

})
