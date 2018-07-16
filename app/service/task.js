const Service = require('egg').Service;

class Task extends Service {

  async find(where) {

    const result = await this.app.mysql.get('cfg_task', where );
    return result;
  }
}

module.exports = Task;