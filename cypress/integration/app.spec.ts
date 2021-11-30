beforeEach(() => cy.visit('/'))

describe('AddBar', () => {
  describe('Adding Items', () => {
    it('Can add an item to the list by submitting with `{enter}`', () => {
      cy.get('[data-cy=add-bar-input]').type('Eggs{enter}')
      cy.get('[data-cy=item]').contains('Eggs')
      // The input should be empty after submitting
      cy.get('[data-cy=add-bar-input]').should('have.value', '')
    })

    it('Can add an item to the list by tapping "Add"', () => {
      cy.get('[data-cy=add-bar-input]').type('Eggs')
      cy.get('[data-cy=add-btn]').click()
      cy.get('[data-cy=item]').contains('Eggs')
    })

    it("Can't add an empty item", () => {
      // Try to add an enpty item
      cy.get('[data-cy=add-bar-input]').type('{enter}')
      // Add a non-empty item
      cy.get('[data-cy=add-bar-input]').type('Eggs{enter}')
      cy.get('[data-cy=item]').should('have.length', 1)
    })

    it("Can't add duplicate items (even if one has whitespace and is in a different case).", () => {
      cy.get('[data-cy=add-bar-input]').type('Eggs{enter}')
      cy.get('[data-cy=add-bar-input]').type('  eggs{enter}')
      cy.get('[data-cy=item]').should('have.length', 1)
    })

    it('Allows adding items with spaces', () => {
      cy.get('[data-cy=add-bar-input]').type('Pop Tarts{enter}')
      cy.get('[data-cy=item]').contains('Pop Tarts')
    })

    it('should let you tap out of the CategoryMenu', () => {
      cy.get('[data-cy=add-bar-input]').type('Eggs')
      // Hold down the "add" button for 1.5 seconds
      cy.get('[data-cy=add-btn]').trigger('mousedown')
      // Wait until the menu appears
      cy.get('[data-cy=category-menu]')
      // Release the mouse after the menu appears
      cy.get('[data-cy=add-btn]').trigger('mouseup', { force: true })
      // Tap out of the CategoryMenu by clicking somewhere outside of it
      cy.get('[data-cy=category-menu-overlay]').click()
      // The CategoryMenu should be gone
      cy.get('[data-cy=category-menu]').should('not.exist')
    })
  })

  describe('ClickNHold', () => {
    it('Can submit a new item with a different category by clicking and holding', () => {
      cy.get('[data-cy=add-bar-input]').type('Eggs')
      // Hold down the "add" button for 1.5 seconds
      cy.get('[data-cy=add-btn]').trigger('mousedown')
      // Wait until the menu appears
      cy.get('[data-cy=category-menu]')
      // Release the mouse after the menu appears
      cy.get('[data-cy=add-btn]').trigger('mouseup', { force: true })
      // Click on the orange button
      cy.get('[data-cy=category-btn-orange]').click()
      cy.get('[data-cy=item]')
        .contains('Eggs')
        .get('[data-cy=item-category-btn]')
        .should('have.class', 'category-orange')
    })
  })
})

describe('Item', () => {
  it('can change category', () => {
    cy.get('[data-cy=add-bar-input]').type('Eggs{enter}')
    cy.get('[data-cy=item]')
      .contains('Eggs')
      .get('[data-cy=item-category-btn]')
      .click()
    cy.get('[data-cy=category-btn-orange]').click()
    cy.get('[data-cy=item]')
      .contains('Eggs')
      .get('[data-cy=item-category-btn]')
      .should('have.class', 'category-orange')
  })

  it('can be deleted', () => {
    cy.get('[data-cy=add-bar-input]').type('Eggs{enter}')
    cy.get('[data-cy=item]')
      .contains('Eggs')
      .get('[data-cy=item-delete-btn]')
      .click()
    cy.get('[data-cy=item]').should('not.exist')
  })

  it('can be crossed off and un-crossed off', () => {
    cy.get('[data-cy=add-bar-input]').type('Eggs{enter}')
    cy.get('[data-cy=item-label]').click()
    cy.get('[data-cy=item]')
      .invoke('attr', 'class')
      .should('contain', 'baseCrossedOff')
    cy.get('[data-cy=item-label]').click()
    cy.get('[data-cy=item]')
      .invoke('attr', 'class')
      .should('not.contain', 'baseCrossedOff')
  })

  it("doesn't check off the item when the category button is clicked", () => {
    // This happens when the click event on the category button isn't prevented from bubbling up to the item.
    cy.get('[data-cy=add-bar-input]').type('Eggs{enter}')
    // Open the category menu
    cy.get('[data-cy=item-category-btn]').click()
    // Check that the item wasn't crossed off
    cy.get('[data-cy=item]')
      .invoke('attr', 'class')
      .should('not.contain', 'baseCrossedOff')
    // Select a new category
    cy.get('[data-cy=category-btn-orange]').click()
    // Check that the item wasn't crossed off
    cy.get('[data-cy=item]')
      .invoke('attr', 'class')
      .should('not.contain', 'baseCrossedOff')
  })

  it('should let you tap out of the CategoryMenu', () => {
    cy.get('[data-cy=add-bar-input]').type('Eggs{enter}')
    cy.get('[data-cy=item]')
      .contains('Eggs')
      .get('[data-cy=item-category-btn]')
      .click()
    // Tap out of the CategoryMenu by clicking somewhere outside of it
    cy.get('[data-cy=category-menu-overlay]').click()
    // The CategoryMenu should be gone
    cy.get('[data-cy=category-menu]').should('not.exist')
  })

  // it('on a list of several items, clicking the delete button deletes the correct item')
  // it('on a list of several items, changing the category of an item changes the category of the correct item')
})

describe('ItemList', () => {
  it('lists items in order of color first and name second', () => {
    cy.get('[data-cy=add-bar-input]').type('Pasta{enter}')
    cy.get('[data-cy=add-bar-input]').type('Milk{enter}')
    cy.get('[data-cy=add-bar-input]').type('Eggs{enter}')
    // Change the category of 'Eggs' to orange
    cy.contains('[data-cy=item]', 'Eggs')
      .find('[data-cy=item-category-btn]')
      .click()
    cy.get('[data-cy=category-btn-orange]').click()
    // The order of the items should be Eggs, Milk, Pasta
    cy.get('[data-cy=item-label]').then((items) => {
      // 'Milk' and 'Pasta' are both in the red category and sorted by name
      expect(items[0].textContent).to.equal('Milk')
      expect(items[1].textContent).to.equal('Pasta')
      // 'Eggs' comes before 'Milk' or 'Pasta' alphabetically, but it is in the
      // orange category, which comes after red in ROYGBIV order.
      expect(items[2].textContent).to.equal('Eggs')
    })
  })
})
