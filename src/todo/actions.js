const _ = require('lodash');
const actions = require('../actions');
const Baobab = require('baobab');

const STORAGE_KEY = 'TODO_LIST';
const COMPLETED_TODO = 'completed';
const ACTIVE_TODO = 'active';
const ALL_TODO = 'all';

const todoPaths = require('./paths');
const filterPaths = require('../filters/paths');


const changeAllTodoStatuses = (status) => ({ self }) =>
  self.todos
    .asArray()
    .updateEach({ status });

const changeOneTodoStatus = (status) => ({ args: { id }, self }) =>
    self.todos
      .findOne({ id })
      .update({ status });

const methods = {
  initialize ({ args, self }) {
    self.todos(args.todos || []);
    self.editedId(null);

    self.counter(Baobab.monkey([
      todoPaths.todos,
      (todoList = []) =>
        todoList.filter((todo) => todo.status === ACTIVE_TODO).length
    ]));

    self.todosComputed(Baobab.monkey([
      filterPaths.isActive,
      todoPaths.todos,
      todoPaths.editedId,
      (activeFilter, todos, editedId) =>
        (activeFilter === ALL_TODO ?
          todos :
          todos.filter((todo) => todo.status === activeFilter))
          .map((todo) => _.defaults({
            editing: todo.id === editedId
          }, todo))
    ]));

    self.isTodosNotEmpty(Baobab.monkey([
      todoPaths.todos,
      (todos) => !_.isEmpty(todos)
    ]));

    self.allCompleted(Baobab.monkey([
      todoPaths.todos,
      (todos) => _.every(todos, { status: COMPLETED_TODO })
    ]));
  },

  removeCompletedTodos ({ self }) {
    self.todos
      .asArray()
      .filter((todo) => todo.status !== COMPLETED_TODO);
  },

  markAllCompleted: changeAllTodoStatuses(COMPLETED_TODO),

  markAllActive: changeAllTodoStatuses(ACTIVE_TODO),

  markOneCompleted: changeOneTodoStatus(COMPLETED_TODO),

  markOneActive: changeOneTodoStatus(ACTIVE_TODO),

  removeTodo ({ args: { id }, self }) {
    self.todos
      .findOne({ id })
      .remove();
  },

  cancelEditingTodo ({ self }) {
    self.editedId(null);
  },

  saveEditingTodo ({ args: { id, value }, self }) {
    self.todos
      .findOne({ id })
      .update({ name: value });
  },

  editTodo ({ args: { id }, self }) {
    self.editedId(id);
  },

  addNewTodo ({ args: { value }, self }) {
    let name = value.trim();
    if (!name.length) {
      return;
    }

    const id = (+new Date() + Math.floor(Math.random() * 999999));

    self.todos
      .asArray()
      .add({
        id,
        name: name.trim(),
        status: 'active'
      });
  },

  loadStorageTodos ({ locator, output, context }) {
    if (context.isServer) {
      return output.success({ todos: [] });
    }
    const storage = locator.resolve('storage');

    storage.getByKey(STORAGE_KEY)
      .then((todos) => output.success({ todos }))
      .catch((error) => output.error({ error }));
  },

  syncTodoInStorage ({ self, output, locator }) {
    let storage = locator.resolve('storage');
    let todos = self.todos();

    storage.setByKey(STORAGE_KEY, todos)
      .then(output.success)
      .catch(output.error);
  }
};

module.exports = {
  methods,
  actions: actions(todoPaths, methods)
};
