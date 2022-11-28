import { DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { ddbClient } from './ddbClient.js';
import { v4 as uuidv4 } from 'uuid';

const getPatient = async (id) => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id }),
    };

    const { Item } = await ddbClient.send(new GetItemCommand(params));
    console.log(Item);

    return (Item) ? unmarshall(Item) : {};
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getAllPatients = async () => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
    };

    const { Items } = await ddbClient.send(new ScanCommand(params));
    console.log('Items: ', Items);
    const retorno =  (Items) ? Items.map((item) => unmarshall(item)) : [];
    console.log('retorno: ', retorno);
    return retorno;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createPatient = async (event) => {
  try {
    console.log(`createProduct function. event: ${event}`);

    const patientRequest = JSON.parse(event.body);
    console.log(patientRequest);
    const patientId = uuidv4();
    console.log(patientId);
    patientRequest.id = patientId;
    console.log(patientRequest);

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(patientRequest || {}),
    };

    console.log(params);

    const createResult = await ddbClient.send(new PutItemCommand(params));
    createResult['data'] = { insertId: patientId };
    console.log(createResult);
    return createResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const deletePatient = async (id) => {
  try {
    console.log(`deleteProduct function. productId: ${id}`);

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id }),
    };

    const deleteResult = await ddbClient.send(new DeleteItemCommand(params));
    console.log(deleteResult);
    return deleteResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const updatePatient = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const objKeys = Object.keys(requestBody);
    console.log(`updateProduct function. requestBody: ${requestBody}, objKeys: ${objKeys}`);

    const update = `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(', ')}`;
    console.log('update: ', update);
    const names = objKeys.reduce((acc, key, index) => ({
      ...acc,
      [`#key${index}`]: key,
    }), {});
    console.log('names: ', names);
    const values = marshall(objKeys.reduce((acc, key, index) =>({
      ...acc,
      [`:value${index}`]: requestBody[key],
    }), {}));
    console.log('values:', values);

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id: event.pathParameters.id }),
      UpdateExpression: update,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
    };

    const updateResult = await ddbClient.send(new UpdateItemCommand(params));
    console.log(updateResult);
    return updateResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const handler = async (event) => {
  console.log('Request:', JSON.stringify(event, undefined, 2));
  let body;
  console.log('httpMethod: ', event.httpMethod)
  console.log('pathParameters: ', event.pathParameters)
  try {
    switch (event.httpMethod) {
      case 'GET':
        if (event.pathParameters != null) {
          console.log('GET: getPatient');
          body = await getPatient(event.pathParameters.id);
        } else {
          console.log('GET: getAllPatients');
          body = await getAllPatients();
        }
        break;
      case 'POST':
        console.log('POST: createPatient');
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
    console.log('body: ', body);
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
