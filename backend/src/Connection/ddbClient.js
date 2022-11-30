import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const region = 'us-east-1';
const ddbClient = new DynamoDBClient({ region });

export { ddbClient };
