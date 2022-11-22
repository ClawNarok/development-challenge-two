const patientController = {
  /**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
  async getAll(_req, res) {
    res.send('OK');
  },
};

module.exports = patientController;
