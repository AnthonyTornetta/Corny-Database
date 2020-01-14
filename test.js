const Database = require('./Database');

let db = new Database("test-db");

if(!db.containsData('test', 'testing'))
{
  db.setData('Testing Success!', 'test', 'testing');
}

const d = db.getData('test', 'testing');
if(d !== 'Testing Success!')
  throw 'Bad data - ' + d;
else
  console.log('Success!');
