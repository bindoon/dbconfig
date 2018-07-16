const Service = require('egg').Service;

/**
 * Test Service
 */
class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
   async sayHi(name) {
    let result = this.app.mysql;

    return `hi, ${name}`;
  }
}

module.exports = Test;