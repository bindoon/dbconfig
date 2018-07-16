'use strict';

const egg = require('egg');
const detectPort = require('detect-port');

module.exports = async function () {
    const clusterPort = await detectPort();
    const agent = new egg.Agent({ clusterPort });
    await agent.ready();
    const app = new egg.Application({ clusterPort });
    await app.ready();

    return app.createAnonymousContext();
};