const Service = require('egg').Service;

/**
 * Column Service
 */
class Column extends Service {

  async find(where) {

    const result = await this.app.mysql.select('cfg_col', {
      where
    });
    return result;
  }
}

module.exports = Column;