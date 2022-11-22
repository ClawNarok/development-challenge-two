const express = require('express');
const cors = require('cors');
const patientRoute = require('../Routes/patientRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/patient', patientRoute);

module.exports = app;
