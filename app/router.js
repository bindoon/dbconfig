'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.options('/api/dbconfig/:taskid', controller.api.dbconfig.read)
  router.get('get', '/api/dbconfig/:taskid', controller.api.dbconfig.read)
  router.post('create', '/api/dbconfig', controller.api.dbconfig.create)
  router.put('/api/dbconfig', controller.api.dbconfig.update)
  router.delete('/api/dbconfig', controller.api.dbconfig.delete)
};
