Cypress.addParentCommand('createDefaultTodos', function () {
  var TODO_ITEM_ONE = 'buy some cheese';
  var TODO_ITEM_TWO = 'feed the cat';
  var TODO_ITEM_THREE = 'book a doctors appointment';

  var cmd = Cypress.Log.command({
    name: 'create default todos',
    message: [],
    onConsole: function () {
      return {
        'Inserted Todos': [TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE]
      };
    }
  });

  cy
    .chain()
    .get('.new-todo', { log: false })
    .wait(100, { log: false })
    .type(TODO_ITEM_ONE + '{enter}', { log: false })
    .wait(100, { log: false })
    .type(TODO_ITEM_TWO + '{enter}', { log: false })
    .wait(100, { log: false })
    .type(TODO_ITEM_THREE + '{enter}', { log: false })
    .wait(100, { log: false })
    .get('.todo-list li', { log: false })
    .then(function ($listItems) {
      cmd.set({ $el: $listItems }).snapshot().end();
    });
});

Cypress.addParentCommand('createTodo', function (todo) {
  var cmd = Cypress.Log.command({
    name: 'create todo',
    message: todo,
    onConsole: function () {
      return {
        'Inserted Todo': todo
      };
    }
  });

  cy
    .chain()
    .wait(100, { log: false })
    .get('.new-todo', { log: false }).type(todo + '{enter}', { log: false })
    .wait(100, { log: false })
    .get('.todo-list', { log: false }).contains('li', todo.trim(), { log: false })
    .then(function ($li) {
      cmd.set({ $el: $li }).snapshot().end();
    });
});
