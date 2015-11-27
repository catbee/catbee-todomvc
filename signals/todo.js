var todo = require('../actions/todo');

exports.todoItemDoubleClick = [
  todo.setEditingTodo
];

exports.todoItemOneClick = [
  todo.clearAllEditingTodos
];