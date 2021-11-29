beforeEach(() => {
  // Cypress starts out with a blank slate for each test
  // so we must tell it to visit our website with the `cy.visit()` command.
  // Since we want to visit the same URL at the start of all our tests,
  // we include it in our beforeEach function so that it runs before each test
  cy.visit('/')
})

describe('AddBar', () => {
  describe('Adding Items', () => {
    it('Can add an item to the list by submitting with `{enter}`', () => {
      cy.get('input').type('Eggs{enter}')
      cy.get('[data-cy=item]').contains('Eggs')
      // The input should be empty after submitting
      cy.get('input').should('have.value', '')
    })

    it('Can add an item to the list by tapping "Add"', () => {
      cy.get('input').type('Eggs')
      cy.get('[data-cy=add-btn]').click()
      cy.get('[data-cy=item]').contains('Eggs')
    })

    it("Can't add an empty item", () => {
      // Try to add an enpty item
      cy.get('input').type('{enter}')
      // Add a non-empty item
      cy.get('input').type('Eggs{enter}')
      cy.get('[data-cy=item]').should('have.length', 1)
    })

    it("Can't add duplicate items (even if one has whitespace).", () => {
      cy.get('input').type('Eggs{enter}')
      cy.get('input').type('  Eggs{enter}')
      cy.get('[data-cy=item]').should('have.length', 1)
    })
  })

  // TODO: Make this test more flexible
  describe('ClickNHold', () => {
    it('Can submit a new item with a different category by clicking and holding', () => {
      cy.get('input').type('Eggs')
      // Hold down the "add" button for 1.5 seconds
      cy.get('[data-cy=add-btn]').trigger('mousedown')
      // Wait until the menu appears
      cy.get('[data-cy=category-menu]')
      // Release the mouse after the menu appears
      cy.get('[data-cy=add-btn]').trigger('mouseup')
      // Click on the orange button
      cy.get('[data-cy=category-btn-orange]').click()
      cy.get('[data-cy=item]')
        .contains('Eggs')
        .get('[data-cy=item-category-btn]')
        .should('have.css', 'background-color', 'rgb(255, 165, 0)')
    })
  })
})

describe('CategoryMenu', () => {
  it('can change category', () => {
    cy.get('input').type('Eggs{enter}')
    cy.get('[data-cy=item]')
      .contains('Eggs')
      .get('[data-cy=item-category-btn]')
      .click()
    cy.get('[data-cy=category-btn-orange]').click()
    cy.get('[data-cy=item]')
      .contains('Eggs')
      .get('[data-cy=item-category-btn]')
      .should('have.css', 'background-color', 'rgb(255, 165, 0)')
  })

  it('can be deleted', () => {
    cy.get('input').type('Eggs{enter}')
    cy.get('[data-cy=item]')
      .contains('Eggs')
      .get('[data-cy=item-delete-btn]')
      .click()
    cy.get('[data-cy=item]').should('not.exist')
  })

  it('can be crossed off and un-crossed off', () => {
    cy.get('input').type('Eggs{enter}')
    cy.get('[data-cy=item-label]').click()
    cy.get('[data-cy=item]').should(
      'have.css',
      'background-color',
      'rgb(204, 204, 204)'
    )
    cy.get('[data-cy=item-label]').click()
    cy.get('[data-cy=item]').should(
      'have.css',
      'background-color',
      'rgba(0, 0, 0, 0)'
    )
  })

  it('lists items in order of color first and name second', () => {
    cy.get('input').type('Pasta{enter}')
    cy.get('input').type('Milk{enter}')
    cy.get('input').type('Eggs{enter}')
    // Change the category of 'Eggs' to orange
    cy.contains('[data-cy=item]', 'Eggs')
      .find('[data-cy=item-category-btn]')
      .click()
    cy.get('[data-cy=category-btn-orange]').click()
    // The order of the items should be Eggs, Milk, Pasta
    cy.get('[data-cy=item-label]').then((items) => {
      expect(items[0].textContent).to.equal('Eggs')
      expect(items[1].textContent).to.equal('Milk')
      expect(items[2].textContent).to.equal('Pasta')
    })
  })

  // it('on a list of several items, clicking the delete button deletes the correct item')
  // it('on a list of several items, changing the category of an item changes the category of the correct item')
})
