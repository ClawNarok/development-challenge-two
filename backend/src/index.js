const express = require('express');

const api = express();

api.get('/', (_req, res) => {
  res.send('olá mundo!');
});

api.listen(3001, () => {
  console.log('rodando na porta 3001');
});
