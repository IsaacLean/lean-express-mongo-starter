'use strict';

const app = require('./app');
const config = require('./config');

const PORT = config.port;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
