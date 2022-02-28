/// <reference types="cypress" />

 class LoginPage{

    private StagingLink: string = 'https://staging.unifiedpractice.com/Public/Account/Login'
    private username: string = 'input[name="Parameter.UserName"]';
    private password: string = 'input[name="Parameter.Password"]'; 
    //private PPNCFPCCPE: string = 'PPNCFPCCPE'
    //private PPNCFPCCPEpassword: string = 'password'
    
    goToStaging(): void{
        cy.visit(this.StagingLink)
    }


    loginPPNCFPCCPE(): void{
        cy.get(this.username).type('PPNCFPCCPE');
        cy.get(this.password).type('password');
    }



}
export default LoginPage