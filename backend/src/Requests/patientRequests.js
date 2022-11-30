import { DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { ddbClient } from '../Connection/ddbClient.js';

const getPatient = async (id) => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id }),
    };

    const { Item } = await ddbClient.send(new GetItemCommand(params));
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
    const retorno =  (Items) ? Items.map((item) => unmarshall(item)) : [];
    return retorno;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createPatient = async (event) => {
  try {

    const patientRequest = JSON.parse(event.body);
    const patientId = uuidv4();
    patientRequest.id = patientId;

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(patientRequest || {}),
    };


    const createResult = await ddbClient.send(new PutItemCommand(params));
    createResult['data'] = { insertId: patientId };
    return createResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const deletePatient = async (id) => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id }),
    };

    const deleteResult = await ddbClient.send(new DeleteItemCommand(params));
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

    const update = `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(', ')}`;
    const names = objKeys.reduce((acc, key, index) => ({
      ...acc,
      [`#key${index}`]: key,
    }), {});
    const values = marshall(objKeys.reduce((acc, key, index) =>({
      ...acc,
      [`:value${index}`]: requestBody[key],
    }), {}));

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id: event.pathParameters.id }),
      UpdateExpression: update,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
    };

    const updateResult = await ddbClient.send(new UpdateItemCommand(params));
    return updateResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};


export { getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient };
