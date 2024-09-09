const express = require('express');

const routes = require('./Routes/routes');

const app = express();

app.use(express.json());

app.use(routes);

require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => console.log(`MailServer is running port ${port}`));
