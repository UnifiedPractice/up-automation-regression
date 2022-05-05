/// <reference types="cypress" />

 class LoginPage{

    private StagingLink: string = 'https://staging.unifiedpractice.com/Public/Account/Login'
   // private StagingLink: string = 'https://staging.unifiedpractice.com/PublicRelease/Account/Login'
    private username: string = 'input[name="Parameter.UserName"]';
    private password: string = 'input[name="Parameter.Password"]'; 

    goToStaging(): void {
        cy.visit(this.StagingLink)
    }


    loginPPNCFPCCPE(): void {
        cy.wait(800).get(this.username).type('PPNCFPCCPE');
        cy.get(this.password).type('password');
    }

    



}
export default LoginPage