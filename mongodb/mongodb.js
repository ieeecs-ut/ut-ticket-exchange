const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://utUser:7iZ7NJ6vUkACuaJs@back-end.a4pzw.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
//   console.log(client.db("test").)
   databasesList = await client.db().admin().listDatabases();
 
   console.log("Databases:");
   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
});
