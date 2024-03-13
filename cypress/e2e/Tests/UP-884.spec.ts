import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import PatientList from "../PageObject/patient-list";
import OnboardingForms from "../PageObject/clinic-settings/clinic-onboarding-forms";
import ClinicStaff from "../PageObject/clinic-settings/clinic-staff";

describe('Automation test for UP-884', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const patientList = new PatientList();
    const onboardingForms = new OnboardingForms();
    const clinicStaff = new ClinicStaff();


 
    it("UP-884", function () {

        login.goToStaging();
        login.loginAutomation()

        navigate.extendMenu()

        navigate.selectCS('Clinic Staff')
        clinicStaff.clickOnDetails('Automation Engineer')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AutoAcceptAppointments')
        clinicStaff.saveButton();

        navigate.extendMenu()

        navigate.selectCS('Onboarding Forms');
        onboardingForms.changeStateCCPEScreeningForms();

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
        onboardingForms.changeStateCCPEScreeningForms()


    })

})
