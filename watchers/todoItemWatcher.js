module.exports = function todoItemWatcher (attributes) {
  var id = attributes['cat-id'];
  id = Number(id);

  return {
    name: ['todos', { id }, 'name'],
    checked: ['todos', { id }, 'checked']
  };
};
