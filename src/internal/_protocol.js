const type = require('../type');

class Protocol {
  constructor(...methods) {
    this.implementations = {};
    methods.forEach(method => {
      this[method] = (first, ...args) => {
        return this.implementations[type(first)][method](first, ...args);
      };
    });
  }
  extendTo(type, implementation) {
    const store = this.implementations[type] = {};
    Object.keys(implementation)
      .forEach(method => {
        store[method] = implementation[method];
      });
  }
}

module.exports = Protocol;
