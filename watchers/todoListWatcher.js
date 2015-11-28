module.exports = function(attributes) {

  console.log('watcher attributes');
  console.log(attributes);
  console.log(arguments);

  return {
    todos: ['todos'],
    editingId: ['editingId']
  }
};