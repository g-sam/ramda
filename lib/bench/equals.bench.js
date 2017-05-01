var equals = require('../..').equals;

var date1 = new Date(2000);
var date2 = new Date(2000);
var date3 = new Date(3000);
var regexp1 = /test/;
var regexp2 = /test/;
var regexp3 = /other/;
var error1 = new Error('test');
var error2 = new Error('test');
var error3 = new Error('other');

module.exports = {
  name: 'ramda (switch) equals',
  tests: {
    'unequal (int, int)': function() {
      return equals(4, 2);
    },
    'equal (int, int)': function() {
      return equals(4, 4);
    },
    'unequal (Date, Date)': function() {
      return equals(date1, date3);
    },
    'equal (Date, Date)': function() {
      return equals(date1, date2);
    },
    'unequal (Error, Error)': function() {
      return equals(error1, error3);
    },
    'equal (Error, Error)': function() {
      return equals(error1, error2);
    },
    'unequal (RegExp, RegExp)': function() {
      return equals(regexp1, regexp3);
    },
    'equal (RegExp, RegExp)': function() {
      return equals(regexp1, regexp2);
    }
  }
};
