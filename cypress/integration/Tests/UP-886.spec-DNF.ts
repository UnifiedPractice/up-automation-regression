import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import PatientList from "../PageObject/patient-list";
import OnboardingForms from "../PageObject/clinic-settings/clinic-onboarding-forms";

describe('Automation test for UP-886', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const patientList = new PatientList();
    const onboardingForms = new OnboardingForms();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'sessionid', 'chatToken')
    })
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-886", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu()

        navigate.selectCS('Onboarding Forms');
        onboardingForms.changeNewPatientScreeningForms();

        navigate.extendMenu();

        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.createAccountProceed()
        pp.bookNewAppointmentASAP()
        pp.selectCompleteFormsAndCompleteScreeningForms()

        //Cleaning

        pp.backtoEHR();
        navigate.extendMenu()
        navigate.selectCS('Onboarding Forms');
        onboardingForms.visibilityForAllScreeningForms();


    })

})
