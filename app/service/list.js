const Service = require('egg').Service;

/**
 * Column Service
 */
class Column extends Service {

  async find(name, condition) {

    const result = await this.app.mysql.select(name, condition);
    return result;
  }
}

module.exports = Column;