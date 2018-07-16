'use strict';

const Controller = require('egg').Controller;

class DBConfig extends Controller {
  async create() {
    this.ctx.body = 'create';
  }
  async read() {
    const { ctx, service } = this;

    const taskid = ctx.params.taskid;

    // 获取任务表信息
    const tableInfo = await service.task.find({ id: taskid });

    if (!tableInfo) {
      ctx.body = {
        success: false,
        message: 'task not exist'
      };
      return;
    }

    // 获取任务的配置信息
    const columns = await service.column.find({ taskid: taskid });

    const condition = {};

    if (tableInfo.order) {
      condition.orders = tableInfo.order.split(',').map((order) => {
        return order.split(' ')
      });
    }

    condition.columns = columns.map(column => {
      return column.name
    }).filter(name => {
      return !!name
    });

    const list = await service.list.find(tableInfo.name, condition);

    ctx.body = {
      success: true,
      data: {
        tableInfo,
        columns,
        list
      }
    }
  }
  async update() {
    this.ctx.body = 'update';
  }
  async delete() {
    this.ctx.body = 'delete';
  }
}

module.exports = DBConfig;
