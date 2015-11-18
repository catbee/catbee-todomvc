var statements = require('../actions/statements');
var counter = require('../actions/counter');
var filters = require('../actions/filters');

exports.route = [
  statements.setTitle,
  statements.setHeader,
  counter.setBaseCount,
  filters.setActiveFilter,
  filters.setFiltersList,
  filters.setFilters
];
