const core = require('./core.js');
core.start();

const app = require('./app/core.js');
core.app = app;
app.start();
