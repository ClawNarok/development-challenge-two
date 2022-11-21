const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json);

app.get('/patient', (_req, res) => {
  res.send('olá mundo!');
});

app.listen(3001, () => {
  console.log('rodando na porta 3001');
});
