var todo = require('../actions/todo');

exports.todoItemDoubleClick = [
  todo.setEditingTodo
];

exports.todoItemOneClick = [
  todo.clearAllEditingTodos
];

exports.todoItemOnEnter = [
  todo.clearAllEditingTodos,
  todo.saveEditingTodo
];