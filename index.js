'use strict';

const app = require('./app');
const config = require('./config');

const PORT = process.env.PORT || config.EXPRESS_PORT;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));