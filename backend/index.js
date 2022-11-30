import { getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient } from './src/Requests/patientRequests.js';

const handler = async (event) => {
  let body;
  try {
    switch (event.httpMethod) {
      case 'GET':
        if (event.pathParameters != null) {
          body = await getPatient(event.pathParameters.id);
        } else {
          body = await getAllPatients();
        }
        break;
      case 'POST':
        body = await createPatient(event);
        break;
      case 'DELETE':
        body = await deletePatient(event.pathParameters.id);
        break;
      case 'PUT':
        body = await updatePatient(event);
        break;
      default:
        throw new Error(`Unsupported route: ${event.httpMethod}`);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully finished operation: ${event.httpMethod}`,
        body: body,
      }),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to perform operation.',
        errorMsg: e.message,
        errorStack: e.stack,
      }),
    };
  }
};

export { handler };
