// https://thisdavej.com/how-to-watch-for-files-changes-in-node-js/

import * as path from "path";

const Tail = require('tail').Tail;
const tail = new Tail(path.join(__dirname, '..', 'server', 'latest.log'));

export default function () { 
  
  console.log('Listening to latest.log')

  tail.on('line', function(data) {
    console.log(data)
  })
  
  tail.on('error', function(error) {
    console.log('ERROR: ', error)
  })
}