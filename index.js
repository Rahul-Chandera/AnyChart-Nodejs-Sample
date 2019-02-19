
let handler = require('./handler.js');

handler.handler({}, {}, (error, data) => {
  console.log(data);
  return;
});
