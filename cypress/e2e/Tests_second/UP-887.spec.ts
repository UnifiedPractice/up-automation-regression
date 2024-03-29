import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import PatientList from "../PageObject/patient-list";
import OnboardingForms from "../PageObject/clinic-settings/clinic-onboarding-forms";

describe('Automation test for UP-887', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const patientList = new PatientList();
    const onboardingForms = new OnboardingForms();

 
    it("UP-887", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu()

        navigate.selectCS('Onboarding Forms');
        onboardingForms.activateScreeningForms();

        navigate.extendMenu();

        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.bookNewAppointmentASAPAutomationWithCCPE()
        pp.selectCompleteFormsAndCompleteScreeningForms()

        //Cleaning

        pp.backtoEHR();
        navigate.extendMenu()
        navigate.selectCS('Onboarding Forms');
        onboardingForms.visibilityForAllScreeningForms();


    })

})
