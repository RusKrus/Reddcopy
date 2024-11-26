describe('post box work', () => {
    beforeEach(()=>{
      cy.visit('localhost:3000');
    })

    it("shows correct action container work", ()=>{
        context("likes counter works correctly", ()=>{
            cy.getByData('postBox').eq(0).children().eq(0).children().eq(0).within(($element)=>{
                cy.wrap($element).children().eq(0).invoke('attr', 'class').should('contain', 'likeBtnPostBox');
                cy.wrap($element).children().eq(1).invoke('attr', 'class').should('contain', 'likesCounterPostBox');
                cy.wrap($element).children().eq(0).click().invoke('attr', 'class').should('contain', 'clickedLikeBtnPostBox');
                cy.wrap($element).children().eq(1).invoke('attr', 'class').should('contain', 'likesCounterGreenPostBox');
                cy.wrap($element).children().eq(0).click().invoke('attr', 'class').should('contain', 'likeBtnPostBox');
                cy.wrap($element).children().eq(1).invoke('attr', 'class').should('contain', 'likesCounterPostBox');

                cy.wrap($element).children().eq(2).invoke('attr', 'class').should('contain', 'dislikeBtnPostBox');
                cy.wrap($element).children().eq(2).click().invoke('attr', 'class').should('contain', 'clickedDislikeBtnPostBox');
                cy.wrap($element).children().eq(1).invoke('attr', 'class').should('contain', 'likesCounterRedPostBox');
                cy.wrap($element).children().eq(2).click().invoke('attr', 'class').should('contain', 'dislikeBtnPostBox');
                cy.wrap($element).children().eq(1).invoke('attr', 'class').should('contain', 'likesCounterPostBox');
            })
        })
        context("comments button behaviour", ()=>{
            cy.getByData('postBox').eq(0).children().eq(0).children().eq(1).click();
            cy.location("pathname").should("not.equal", "/");
        })
    })
    it("shows correct post container work", ()=>{
        cy.getByData('postBox').each(($element, index, $list)=>{
            cy.wrap($element).children().eq(1).within(($childElement)=>{
                cy.wrap($childElement).find('[class*=subredditPhoto]').invoke('attr','src').should('not.equal', "");
                cy.wrap($childElement).find('[class*=subredditName]').invoke('attr','text').should('not.equal', "");
                cy.wrap($childElement).find('[class*=userName]').invoke('attr','text').should('not.equal', "");
                cy.wrap($childElement).find('[class*=timeAgo]').invoke('attr','text').should('not.equal', "");
                cy.wrap($childElement).find('[class*=title]').invoke('attr','text').should('not.equal', "");
            })
        })
    })
})