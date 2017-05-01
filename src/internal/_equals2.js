// var _arrayFromIterator = require('./_arrayFromIterator');
// var _functionName = require('./_functionName');
var _has = require('./_has');
var identical = require('../identical');
var keys = require('../keys');
var type = require('../type');
var Protocol = require('./_protocol');

const E = new Protocol('equals');

E.extendTo('Number', {
  equals: function equals(a, b) {
    if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
      return false;
    }
    return true;
  }
});

E.extendTo('Date', {
  equals: function equals(a, b) {
    if (!identical(a.valueOf(), b.valueOf())) {
      return false;
    }
    return true;
  }
});

E.extendTo('Error', {
  equals: function equals(a, b) {
    return a.name === b.name && a.message === b.message;
  }
});

E.extendTo('RegExp', {
  equals: function equals(a, b) {
    if (!(a.source === b.source &&
      a.global === b.global &&
      a.ignoreCase === b.ignoreCase &&
      a.multiline === b.multiline &&
      a.sticky === b.sticky &&
      a.unicode === b.unicode)) {
      return false;
    }
    return true;
  }
});

module.exports = function _equals2(a, b, stackA, stackB) {
  if (identical(a, b)) {
    return true;
  }

  if (type(a) !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) &&
      typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) &&
      typeof b.equals === 'function' && b.equals(a);
  }

  if (!E.equals(a, b)) { return false; }

  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  stackA.push(a);
  stackB.push(b);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals2(b[key], a[key], stackA, stackB))) {
      return false;
    }
    idx -= 1;
  }
  stackA.pop();
  stackB.pop();
  return true;
};
