describe("Profile Page: Upload CV", () => {

    beforeEach(() => {
        //Go to website and Sign Up
        cy.visit("/");
        cy.contains("Sign Up").click();
        //Input random email address with password
        const uuid = () => Cypress._.random(0, 1e4);
        const number = uuid();
        cy.login({email: 'mockTest' + number + '@gmail.com', password: 'Test@123'});
        cy.get('button').contains('Sign Up').should("be.visible").click();
        cy.url().should('include', '/profile/details');
    })

    afterEach(() => {
        cy.get('button').contains('Log Out').should("be.visible").click();
    })

    it("Upload valid CV in Profile Page", () => {
        const cvPath = "validCV.pdf";

        cy.contains("Personal Details").should("be.visible");
        cy.get("[name='firstName']").type("Mike");
        cy.get("[name='lastName']").type("Shindo");
        cy.get("[name='email']").should('include.value', '@gmail.com');
        cy.get("[name='phone']").type("0423849958");
        //Preferred work location
        cy.get("[class='StyledTextInput__StyledPlaceholder-sc-1x30a0s-2 dSoebG']")
            .click({force:true});
        cy.get("input[type='search']")
            .scrollTo('center', {ensureScrollable:false})
            .type("melbourne");
        cy.get('div[class="DropdownOption-smggga-0 fZnPMB"]').should('contain', 'Melbourne').click();
        cy.get("input[value='No']").should('be.checked');
        //Timezone
        cy.get('input[class="StyledTextInput-sc-1x30a0s-0 dlPfkl Select__SelectTextInput-sc-17idtfo-0 lmyIUy"]')
            .click();
        cy.get('input[type="search"]').type("melbourne");
        cy.get('div[class="DropdownOption-smggga-0 fZnPMB"]').should('contain', 'Melbourne').click();
        //Employment type
        cy.contains('Full-time').click({force:true});
        //Salary
        cy.get('input[placeholder="Min"]').click({force:true});
        cy.get('div[class="StyledBox-sc-13pk1d4-0 cuJBzn SelectContainer__OptionsBox-sc-1wi0ul8-0 eBHXEP"]').first().click();
        cy.get('input[placeholder="Max"]').click({force:true});
        cy.get('div[class="StyledBox-sc-13pk1d4-0 cuJBzn SelectContainer__OptionsBox-sc-1wi0ul8-0 eBHXEP"]').first().click();
        //Save
        cy.get('button').contains('Save').scrollIntoView().should("be.visible").click();

        cy.wait(10000);
        //Upload CV
        cy.contains('Upload CV').click();
        //Upload CV/Resume with prefill switch checked
        cy.get('input[type="checkbox"]').should("be.checked");
        cy.get('input[type="file"]')
            .get('input[name="cv-upload"]')
            .selectFile('cypress/fixtures/' + cvPath, {force: true});

        cy.wait(20000);
        cy.get('svg[class="CloseIconButton-sc-19wgu2s-0 cIsOEY"]').click();

        //Experience and Skills section needs review
        cy.get(':nth-child(4) > .Section-sc-14hpz9h-0 > .H3-sc-1f2idct-0')
            .scrollIntoView()
            .should('contain', 'Experience and Skills')
            .and('contain', 'Needs review');
        cy.contains("Please review the information parsed from your CV.").should("be.visible");

        //Go to Experience and Skills edit page
        cy.get('a[href="/profile/experience-and-skills"]').click();
        cy.url().should('include', '/profile/experience-and-skills');
        cy.contains("Experience and Skills").should("be.visible");
        cy.contains("NEEDS REVIEW").should("be.visible");
        cy.get('button').contains('Update').should("be.visible").click();
        //Edit job details
        cy.contains("Edit job details").should("be.visible");
        cy.get('button').contains('Save').should("be.visible");
        cy.get('button').contains('Cancel').should("be.visible").click();
        cy.contains("Add another job").should("be.visible");
        //Back to profile page
        cy.contains("Back to profile").should("be.visible").click();
        cy.url().should('not.contain', '/profile/experience-and-skills');
    });

    it("Upload BLANK CV in Profile Page", () => {
        const cvPath = "blankCV.docx";

        cy.contains("Personal Details").should("be.visible");
        cy.get("[name='firstName']").type("Blake");
        cy.get("[name='lastName']").type("Langley");
        cy.get("[name='email']").should('include.value', '@gmail.com');
        cy.get("[name='phone']").type("0438694473");
        //Preferred work location
        cy.get("[class='StyledTextInput__StyledPlaceholder-sc-1x30a0s-2 dSoebG']")
            .click({force:true});
        cy.get("input[type='search']")
            .scrollTo('center', {ensureScrollable:false})
            .type("melbourne");
        cy.get('div[class="DropdownOption-smggga-0 fZnPMB"]').should('contain', 'Melbourne').click();
        cy.get("input[value='No']").should('be.checked');
        //Timezone
        cy.get('input[class="StyledTextInput-sc-1x30a0s-0 dlPfkl Select__SelectTextInput-sc-17idtfo-0 lmyIUy"]')
            .click();
        cy.get('input[type="search"]').type("melbourne");
        cy.get('div[class="DropdownOption-smggga-0 fZnPMB"]').should('contain', 'Melbourne').click();
        //Employment type
        cy.contains('Full-time').click({force:true});
        //Salary (Min-Max)
        cy.get('input[placeholder="Min"]').click({force:true});
        cy.get('div[class="StyledBox-sc-13pk1d4-0 cuJBzn SelectContainer__OptionsBox-sc-1wi0ul8-0 eBHXEP"]').first().click();
        cy.get('input[placeholder="Max"]').click({force:true});
        cy.get('div[class="StyledBox-sc-13pk1d4-0 cuJBzn SelectContainer__OptionsBox-sc-1wi0ul8-0 eBHXEP"]').first().click();
        //Save
        cy.get('button').contains('Save').scrollIntoView().should("be.visible").click();

        cy.wait(10000);
        //Upload CV
        cy.contains('Upload CV').click();
        //Upload CV/Resume with prefill switch checked
        cy.get('input[type="checkbox"]').should("be.checked");
        cy.get('input[type="file"]')
            .get('input[name="cv-upload"]')
            .selectFile('cypress/fixtures/' + cvPath, {force: true});

        cy.wait(14000);
        cy.get('svg[class="CloseIconButton-sc-19wgu2s-0 cIsOEY"]').click();

        //Experience and Skills section has NO review
        cy.get(':nth-child(4) > .Section-sc-14hpz9h-0 > .H3-sc-1f2idct-0')
            .scrollIntoView()
            .should('contain', 'Experience and Skills')
            .and('not.contain', 'Needs review');
        cy.contains("Please review the information parsed from your CV.").should("not.exist");

        //Go to Experience and Skills > Start page
        cy.get('a[href="/profile/experience-and-skills"]').click();
        cy.url().should('include', '/profile/experience-and-skills');
        cy.contains("Experience and Skills").should("be.visible");
        cy.contains("NEEDS REVIEW").should("not.exist");
        cy.contains("New job details").should("be.visible");
        cy.get('button').contains('Update').should("not.exist");
        //Edit job details should not show
        cy.contains("Edit job details").should("not.exist");
        cy.get('button').contains('Save').should("be.visible");
        //Back to profile page
        cy.contains("Back to profile").should("be.visible").click();
        cy.url().should('not.contain', '/profile/experience-and-skills');
    });

    it("Upload Cover Letter in Profile Page", () => {
        const cvPath = "coverLetter.doc";

        cy.contains("Personal Details").should("be.visible");
        cy.get("[name='firstName']").type("Ashley");
        cy.get("[name='lastName']").type("Maria");
        cy.get("[name='email']").should('include.value', '@gmail.com');
        cy.get("[name='phone']").type("0549684403");
        //Preferred work location
        cy.get("[class='StyledTextInput__StyledPlaceholder-sc-1x30a0s-2 dSoebG']")
            .click({force:true});
        cy.get("input[type='search']")
            .scrollTo('center', {ensureScrollable:false})
            .type("melbourne");
        cy.get('div[class="DropdownOption-smggga-0 fZnPMB"]').should('contain', 'Melbourne').click();
        cy.get("input[value='No']").should('be.checked');
        //Timezone
        cy.get('input[class="StyledTextInput-sc-1x30a0s-0 dlPfkl Select__SelectTextInput-sc-17idtfo-0 lmyIUy"]')
            .click();
        cy.get('input[type="search"]').type("melbourne");
        cy.get('div[class="DropdownOption-smggga-0 fZnPMB"]').should('contain', 'Melbourne').click();
        //Employment type
        cy.contains('Full-time').click({force:true});
        //Salary (Min-Max)
        cy.get('input[placeholder="Min"]').click({force:true});
        cy.get('div[class="StyledBox-sc-13pk1d4-0 cuJBzn SelectContainer__OptionsBox-sc-1wi0ul8-0 eBHXEP"]').first().click();
        cy.get('input[placeholder="Max"]').click({force:true});
        cy.get('div[class="StyledBox-sc-13pk1d4-0 cuJBzn SelectContainer__OptionsBox-sc-1wi0ul8-0 eBHXEP"]').first().click();
        //Save
        cy.get('button').contains('Save').scrollIntoView().should("be.visible").click();

        cy.wait(10000);
        //Upload CV
        cy.contains('Upload CV').click();
        //Upload CV/Resume with prefill switch checked
        cy.get('input[type="checkbox"]').should("be.checked");
        cy.get('input[type="file"]')
            .get('input[name="cv-upload"]')
            .selectFile('cypress/fixtures/' + cvPath, {force: true});

        cy.wait(14000);
        cy.get('svg[class="CloseIconButton-sc-19wgu2s-0 cIsOEY"]').click();

        //Experience and Skills section has NO review
        cy.get(':nth-child(4) > .Section-sc-14hpz9h-0 > .H3-sc-1f2idct-0')
            .scrollIntoView()
            .should('contain', 'Experience and Skills')
            .and('not.contain', 'Needs review');
        cy.contains("Please review the information parsed from your CV.").should("not.exist");

        //Go to Experience and Skills > Start page
        cy.get('a[href="/profile/experience-and-skills"]').click();
        cy.url().should('include', '/profile/experience-and-skills');
        cy.contains("Experience and Skills").should("be.visible");
        cy.contains("NEEDS REVIEW").should("not.exist");
        cy.contains("New job details").should("be.visible");
        cy.get('button').contains('Update').should("not.exist");
        //Edit job details should not show
        cy.contains("Edit job details").should("not.exist");
        cy.get('button').contains('Save').should("be.visible");
        //Back to profile page
        cy.contains("Back to profile").should("be.visible").click();
        cy.url().should('not.contain', '/profile/experience-and-skills');
    });

});