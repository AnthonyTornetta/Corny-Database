
# Corny-Database
This is a really redneck, incredibly simple, database written in JS .
It stores all data in memory, but is fast when retrieving/writing data.
Should you use this over something like MongoDB?  Definitely not for large scale applications that will be storing a lot of data, but maybe for smaller programs where keeping all the data in memory won't hurt.  And yes this does have persistent storage through json files.

## So how does it work?
The only export present in this package is the class "Database"
```js
const Database = require('corny-database');
```
To use the database simply assign it a name to be loaded/saved as.
```js
const db = new Database("database-main");
```
Each database is organized into a hierarchical tree similar to that of an object in JSON.  To store something in it, simply do.
```js
db.setData(value, 'foo', 'bar', 'foobar');
```
This would create an object akin to
```js
const obj =
{
  foo:
  {
    bar:
    {
      foobar: value
    }
  }
};
```
in your database.
To get the value there, simply use
```js
db.getData('foo', 'bar', 'foobar');
```
You can also get the object containing other values in the database by doing:
```js
db.getData('foo', 'bar');
```
Be mindful of modifying this however, as doing so will not save the database unless another db.setData() is called or db.save() is called.

To check if the database contains a value or category you can do this check:
```js
database.containsData('foo', 'bar', 'foobar');
```
You can get all the data in the database (modifying this is not reccomended) by just doing "db.data", and set it by saying "db.data = ...;".  This will also save the database.  The datafile this database is saved to can be found by getting db.dataFile.
### Backups
To backup your database, you can use the function
```js
db.backup(callback);
```
This will create a folder with the database name suffixed with -backup.
