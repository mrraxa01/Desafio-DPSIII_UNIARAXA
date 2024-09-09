const express = require('express');
const routes = require('./Routes/routes');
const { mongoose } = require('mongoose');
mongoose.set('strictQuery', true);
const app = express();

app.use(express.json());
app.use(routes);

require('dotenv').config();

const url_DB  = process.env.DB_STRING_CONNECTION;
const port = process.env.PORT;

mongoose.connect(url_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });


app.listen(port, () => console.log(`API Gateway is running port ${port}`));