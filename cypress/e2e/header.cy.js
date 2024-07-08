
describe('header work', () => {
  beforeEach(()=>{
    cy.visit('localhost:3000');
  })
    it("must show that header rendered correctly", ()=>{
      cy.getByRole('banner').should('exist').children().should('have.length', 3);
      cy.getByData('postContainer').eq(0).click();
      cy.getByRole('banner').should('exist').children().should('have.length', 3);
    })
    it("must show correct logo behaviour", ()=>{
      cy.getByData('postContainer').eq(0).find('h3').click();
      cy.location('pathname').should('not.equal', "/");
      cy.getByRole('banner').children().eq(0).should('exist').and('have.text', 'Reddcopy').click();
      cy.location('pathname').should('equal', "/");
    })
    it('must show correct input behaviour', ()=>{
      cy.getByRole('banner').children().eq(1).find("input").should('exist').and('have.attr', 'placeholder', "Type to search...")
      .type("Some text not possible to find here {enter}").focus();
      cy.getByData("not-found-button").should("exist");
      cy.getByRole('banner').find("form")
      cy.getByData("clear-button").should("be.visible").click({force:true});
      cy.getByData("not-found-button").should("not.exist");
    })
    it('must show correct dropdown menu behaviour',()=>{
      cy.getByData("dropdown-options").should('exist').and('not.be.visible');
      cy.getByData("modal-window-background").should('exist').and('not.be.visible');
      cy.getByRole('banner').children().eq(2).should('exist').click();
      cy.getByData("dropdown-options").should('exist').and('be.visible').find('button').contains('Report a bug').click();
      cy.getByData("modal-window-background").should('exist').and('be.visible').children().eq(0).find('h2').contains("Report bug")
      .next().click();
      cy.getByData("modal-window-background").should('not.be.visible');
      cy.getByRole('banner').children().eq(2).click().find("[data-testid = dropdown-options]>button").click().next().children().eq(0)
      .children().eq(1).within(()=>{
        cy.getByType("submit").click();
        cy.getByType("email").should("have.prop", "validationMessage").and("not.be.empty");
        cy.get("textarea").should("have.prop", "validationMessage").and("not.be.empty");
        cy.getByType("email").type("somemail@gmail.com").parent().find('textarea').type("Some bug's description").parent()
        .getByType("file").should('exist').parent().find('button').click();
      })
      cy.getByData('dropdown-options').should('not.be.visible');
  })
})