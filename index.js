#!/usr/bin/env node
let handler = require('./app.js');

handler.handler({}, {}, (error, data) => {
  console.log(data);
  return;
});