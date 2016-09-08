describe('Catbee TodoMVC', function () {
  var TODO_ITEM_ONE = 'buy some cheese';
  var TODO_ITEM_TWO = 'feed the cat';
  var TODO_ITEM_THREE = 'book a doctors appointment';

  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  context('When page is initially opened', function () {
    it('should focus on the todo input field', function () {
      cy.focused().should('have.class', 'new-todo');
    });
  });

  context('No Todos', function () {
    it('should hide #main and #footer', function () {
      cy
        .get('.todo-list li').should('not.exist')
        .get('.main').should('not.exist')
        .get('.footer').should('not.exist');
    });
  });

  context('New Todo', function () {
    it('should allow me to add todo items', function () {
      cy
        .get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')
        .get('.todo-list li').eq(0).find('label').should('contain', TODO_ITEM_ONE)
        .get('.new-todo').type(TODO_ITEM_TWO).type('{enter}')
        .get('.todo-list li').eq(1).find('label').should('contain', TODO_ITEM_TWO);
    });

    it('should clear text input field when an item is added', function () {
      cy
        .get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')
        .get('.new-todo').should('have.text', '');
    });

    it('should append new items to the bottom of the list', function () {
      cy
        .wait(100)
        .createDefaultTodos().as('todos')
        .get('.todo-count').contains('3 item left')
        .get('@todos').eq(0).find('label').should('contain', TODO_ITEM_ONE)
        .get('@todos').eq(1).find('label').should('contain', TODO_ITEM_TWO)
        .get('@todos').eq(2).find('label').should('contain', TODO_ITEM_THREE);
    });

    it('should trim text input', function () {
      cy
        .createTodo('    ' + TODO_ITEM_ONE + '    ')
        .get('.todo-list li').eq(0).find('label').should('have.text', TODO_ITEM_ONE);
    });

    it('should show #main and #footer when items added', function () {
      cy
        .createTodo(TODO_ITEM_ONE)
        .get('.main').should('be.visible')
        .get('.footer').should('be.visible');
    });
  });

  context('Mark all as completed', function () {
    beforeEach(function () {
      cy.createDefaultTodos().as('todos');
    });

    it('should allow me to mark all items as completed', function () {
      cy
        .get('.toggle-all').check()
        .get('@todos').eq(0).should('have.class', 'completed')
        .get('@todos').eq(1).should('have.class', 'completed')
        .get('@todos').eq(2).should('have.class', 'completed');
    });

    it('should allow me to clear the complete state of all items', function () {
      cy
        .get('.toggle-all').check().uncheck()
        .get('@todos').eq(0).should('not.have.class', 'completed')
        .get('@todos').eq(1).should('not.have.class', 'completed')
        .get('@todos').eq(2).should('not.have.class', 'completed');
    });

    it('complete all checkbox should update state when items are completed / cleared', function () {
      cy
        .get('.toggle-all').as('toggleAll')
        .check()
        .should('be.checked')
        .get('.todo-list li').eq(0).as('firstTodo')
        .find('.toggle')
        .uncheck()
        .get('@toggleAll').should('not.be.checked')
        .get('@firstTodo').find('.toggle').check()
        .get('@toggleAll').should('be.checked');
    });
  });

  context('Item', function () {
    // New commands used here:
    // - cy.clear    http://on.cypress.io/clear

    it('should allow me to mark items as complete', function () {
      cy
      // we are aliasing the return value of
      // our custom command 'createTodo'
      //
      // the return value is the <li> in the <ul.todos-list>
        .createTodo(TODO_ITEM_ONE).as('firstTodo')
        .createTodo(TODO_ITEM_TWO).as('secondTodo')

        .get('@firstTodo').find('.toggle').check()
        .get('@firstTodo').should('have.class', 'completed')

        .get('@secondTodo').should('not.have.class', 'completed')
        .get('@secondTodo').find('.toggle').check()

        .get('@firstTodo').should('have.class', 'completed')
        .get('@secondTodo').should('have.class', 'completed');
    });

    it('should allow me to un-mark items as complete', function () {
      cy
        .createTodo(TODO_ITEM_ONE).as('firstTodo')
        .createTodo(TODO_ITEM_TWO).as('secondTodo')

        .get('@firstTodo').find('.toggle').check()
        .get('@firstTodo').should('have.class', 'completed')
        .get('@secondTodo').should('not.have.class', 'completed')

        .get('@firstTodo').find('.toggle').uncheck()
        .get('@firstTodo').should('not.have.class', 'completed')
        .get('@secondTodo').should('not.have.class', 'completed');
    });

    it('should allow me to edit an item', function () {
      cy
        .createDefaultTodos().as('todos')

        .get('@todos').eq(1).as('secondTodo')
        // TODO: fix this, dblclick should
        // have been issued to label
        .find('label').dblclick()

        // clear out the inputs current value
        // and type a new value
        .get('@secondTodo').find('.edit').clear()
        .type('buy some sausages').type('{enter}')

        // explicitly assert about the text value
        .get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
        .get('@secondTodo').should('contain', 'buy some sausages')
        .get('@todos').eq(2).should('contain', TODO_ITEM_THREE);
    });
  });

  context('Editing', function () {
    // New commands used here:
    // - cy.blur    http://on.cypress.io/blur

    beforeEach(function () {
      cy.createDefaultTodos().as('todos');
    });

    it('should hide other controls when editing', function () {
      cy
        .get('@todos').eq(1).as('secondTodo')
        .find('label').dblclick()

        .get('@secondTodo').find('.toggle').should('not.be.visible')
        .get('@secondTodo').find('label').should('not.be.visible');
    });

    it('should save edits on blur', function () {
      cy
        .get('@todos').eq(1).as('secondTodo')
        .find('label').dblclick()

        .get('@secondTodo')
        .find('.edit').clear()
        .type('buy some sausages')

        // we can just send the blur event directly
        // to the input instead of having to click
        // on another button on the page. though you
        // could do that its just more mental work
        .blur()

        .get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
        .get('@secondTodo').should('contain', 'buy some sausages')
        .get('@todos').eq(2).should('contain', TODO_ITEM_THREE);
    });

    it('should trim entered text', function () {
      cy
        .get('@todos').eq(1).as('secondTodo')
        .find('label').dblclick()

        .get('@secondTodo')
        .find('.edit').clear()
        .type('    buy some sausages    ').type('{enter}')

        .get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
        .get('@secondTodo').should('contain', 'buy some sausages')
        .get('@todos').eq(2).should('contain', TODO_ITEM_THREE);
    });

    it('should remove the item if an empty text string was entered', function () {
      cy
        .get('@todos').eq(1).as('secondTodo')
        .find('label').dblclick()

        .get('@secondTodo')
        .find('.edit').clear().type('{enter}')

        .get('@todos').should('have.length', 2);
    });

    it('should cancel edits on escape', function () {
      cy
        .get('@todos').eq(1).as('secondTodo')
        .find('label').dblclick()

        .get('@secondTodo')
        .find('.edit').clear().type('foo{esc}')

        .get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
        .get('@todos').eq(1).should('contain', TODO_ITEM_TWO)
        .get('@todos').eq(2).should('contain', TODO_ITEM_THREE);
    });
  });

  context('Counter', function () {
    it('should display the current number of todo items', function () {
      cy
        .createTodo(TODO_ITEM_ONE)
        .get('.todo-count').contains('1 item left')
        .createTodo(TODO_ITEM_TWO)
        .get('.todo-count').contains('2 item left');
    });
  });

  context('Clear completed button', function () {
    beforeEach(function () {
      cy.createDefaultTodos().as('todos');
    });

    it('should display the correct text', function () {
      cy
        .get('@todos').eq(0).find('.toggle').check()
        .get('.clear-completed').contains('Clear completed');
    });

    it('should remove completed items when clicked', function () {
      cy
        .get('@todos').eq(1).find('.toggle').check()
        .get('.clear-completed').click()
        .get('@todos').should('have.length', 2)
        .get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
        .get('@todos').eq(1).should('contain', TODO_ITEM_THREE);
    });

    it('should be hidden when there are no items that are completed', function () {
      cy
        .get('@todos').eq(1).find('.toggle').check()
        .get('.clear-completed').should('be.visible').click()
        .get('.clear-completed').should('not.exist');
    });
  });

  context('Persistence', function () {
    it('should persist its data', function () {
      function testState () {
        cy
          .get('@firstTodo').should('contain', TODO_ITEM_ONE).and('have.class', 'completed')
          .get('@secondTodo').should('contain', TODO_ITEM_TWO).and('not.have.class', 'completed');
      }

      cy
        .createTodo(TODO_ITEM_ONE).as('firstTodo')
        .createTodo(TODO_ITEM_TWO).as('secondTodo')
        .get('@firstTodo').find('.toggle').check()
        .then(testState)
        .visit('http://localhost:3000')
        .wait(200)

        .then(testState);
    });
  });
});
