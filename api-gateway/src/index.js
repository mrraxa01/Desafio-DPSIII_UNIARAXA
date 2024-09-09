const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const port = 3336;

app.listen(port, () => console.log(`API online na porta ${port}!`));