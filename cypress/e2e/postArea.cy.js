describe('post area work', () => {
    beforeEach(()=>{
      cy.visit('localhost:3000');
      cy.getByClassSubstring("title").eq(0).click();
    })
    it("must show correct post area render", ()=>{
        cy.location('pathname').should('not.eq', '/');
        cy.getByClassSubstring("backButton").should('exist');
        cy.getByClassSubstring("postAndCommentsBox").should('exist');
        cy.getByClassSubstring("subredditInfoBox").should('exist');
    })
    it.only("must show correct post and comments box behaviour", ()=>{
      context("desktop post box behaviour", ()=>{
        cy.getByClassSubstring("subredditInfoBox").should('exist').and("be.visible");
        cy.getByClassSubstring("Mobile").each(($el, index, $list)=>{
          cy.wrap($el).should('not.be.visible');
        })
        cy.getByClassSubstring("postAndCommentsBox").children().eq(0).within(($el)=>{
          cy.wrap($el).find('[class*=postDescription]').children().each(($childEl, index, $list)=>{
            cy.wrap($childEl).invoke('attr','text').should('not.equal', "");
          })
        })
      })
      context("mobile post box behaviour", ()=>{
        cy.viewport('iphone-x')
        cy.getByClassSubstring("subredditInfoBox").should('exist').and("not.be.visible");
        cy.getByClassSubstring("Mobile").each(($el, index, $list)=>{
          cy.wrap($el).should('be.visible');
        });
      })
      context("must show correct likes counter work ", ()=>{
        cy.getByClassSubstring("postInfoContainer").children().eq(0).within(($element)=>{
          cy.wrap($element).children().eq(0).invoke('attr', 'class').should('contain', 'likeBtnPostArea');
          cy.wrap($element).children().eq(1).invoke('attr', 'class').should('contain', 'likesCounter');
          cy.wrap($element).children().eq(0).click().invoke('attr', 'class').should('contain', 'clickedLikeBtnPostArea');
          cy.wrap($element).children().eq(1).invoke('attr', 'class').should('contain', 'likesCounterGreen');
          cy.wrap($element).children().eq(0).click().invoke('attr', 'class').should('contain', 'likeBtnPostArea');
          cy.wrap($element).children().eq(1).invoke('attr', 'class').should('contain', 'likesCounter');

          cy.wrap($element).children().eq(2).invoke('attr', 'class').should('contain', 'dislikeBtnPostArea');
          cy.wrap($element).children().eq(2).click().invoke('attr', 'class').should('contain', 'clickedDislikeBtnPostArea');
          cy.wrap($element).children().eq(1).invoke('attr', 'class').should('contain', 'likesCounterRed');
          cy.wrap($element).children().eq(2).click().invoke('attr', 'class').should('contain', 'dislikeBtnPostArea');
          cy.wrap($element).children().eq(1).invoke('attr', 'class').should('contain', 'likesCounter');
      })
      })
      
    })
})