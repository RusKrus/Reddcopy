describe('feed area work', () => {
  beforeEach(()=>{
    cy.visit('localhost:3000');
  })

  it('must show correct content filter behaviour',()=>{
    cy.getByData("content-filter").should('exist').within((el)=>{
      cy.wrap(el).children().should('have.length', 4)
      .eq(0).should('contain','Top')
      .next().should('contain','Hot')
      .next().should('contain','New')
      .next().should('contain','Rising');
      cy.wrap(el).children().eq(0).click().should('have.css', 'color').and('eq','rgb(0, 0, 255)');
      cy.location('pathname').should('contain', 'top');
      cy.wrap(el).children().eq(1).click().should('have.css', 'color').and('eq','rgb(0, 0, 255)');
      cy.location('pathname').should('contain', 'hot');
      cy.wrap(el).children().eq(2).click().should('have.css', 'color').and('eq','rgb(0, 0, 255)');
      cy.location('pathname').should('contain', 'new');
      cy.wrap(el).children().eq(3).click().should('have.css', 'color').and('eq','rgb(0, 0, 255)');
      cy.location('pathname').should('contain', 'rising');
    })
  })
})