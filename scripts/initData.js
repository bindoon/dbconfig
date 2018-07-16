'use strict';

const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');
const createCtx = require('./create_ctx');

const configFile = `../config/config.default.js`;
const config = require(configFile);



(async function () {
    const ctx = await createCtx();

    const localDBConfig = config(ctx.app).mysql.client;

    console.log(`Connect to ${localDBConfig.user}@${localDBConfig.host}:${localDBConfig.port} ...`);

    const sqlFile = path.resolve('./app/model/my.sql');

    const args = [
        `-u${localDBConfig.user}`,
        `-h${localDBConfig.host}`,
        `-P${localDBConfig.port}`,
        localDBConfig.database,
    ];
    if (localDBConfig.password) {
        args.push(`-p${localDBConfig.password}`);
    }

    console.log(`import sql from ${sqlFile}`);
    const mysql = spawn('mysql', args);
    mysql.stdout.on('data', data => {
        console.log(`${data}`);
    });
    mysql.stderr.on('data', data => {
        console.log(`${data}`);
    });
    mysql.on('exit', code => {
        console.log(`exited with code ${code}`);
        if (code === 0) {
            console.log('init success');
        }
        process.exit(code);
    });

    const fileSteam = fs.createReadStream(sqlFile);
    fileSteam.pipe(mysql.stdin);
})();
