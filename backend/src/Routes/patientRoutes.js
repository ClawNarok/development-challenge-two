const { Router } = require('express');
const patientController = require('../Controllers/patientController');

const patientRoute = Router();

patientRoute.get('/', patientController.getAll);

module.exports = patientRoute;
