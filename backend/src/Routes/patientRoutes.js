const patientRoute = {
  GET: (e) => console.log('Get: ', JSON.stringify(e)),
  POST: (e) => console.log('Post: ', JSON.stringify(e)),
  PUT: (e) => console.log('Put: ', JSON.stringify(e)),
  DELETE: (e) => console.log('Delete: ', JSON.stringify(e)),
};

// module.exports = patientRoute;
export default patientRoute;
