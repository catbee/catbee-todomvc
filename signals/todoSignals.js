var todoAction = require('../actions/todoAction');

exports.todoItemDoubleClick = [
  todoAction.setEditingTodo
];

exports.todoItemOneClick = [
  todoAction.clearAllEditingTodos
];

exports.todoItemOnEnter = [
  todoAction.clearAllEditingTodos,
  todoAction.saveEditingTodo
];