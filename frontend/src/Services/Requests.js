import axios from 'axios';

const URL = 'https://s01s49a73d.execute-api.us-east-1.amazonaws.com/prod/patient';
// const headers = {
//   'Access-Control-Allow-Headers': 'Content-Type',
//   'Access-Control-Allow-Origin': 'http://*',
//   'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
// };
const ACAHeaders = 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token';
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': ACAHeaders,
  'Access-Control-Allow-Methods': 'GET,OPTIONS,POST',
  // 'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'X-Requested-With': '*',
};
export const api = axios.create({
  baseURL: URL,
});

api.defaults.headers = { ...headers };

export const getAllPatients = async () => api.get(URL)
  .then(({ data: { body } }) => body)
  .catch((e) => e);

export const addPatient = async (body) => api
  .post(URL, body)
  .then((retorno) => retorno)
  .catch((e) => ({ error: e }));

export const updatePatientById = async (body, id) => api
  .put(`${URL}/${id}`, body)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const getPatientById = async (id) => api.get(`${URL}/${id}`)
  .then(({ data: { body } }) => body)
  .catch((e) => e);

export const deletePatientById = async (id) => api.delete(`${URL}/${id}`);
