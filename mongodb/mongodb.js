const { MongoClient } = require('mongodb')

async function main() {
   const uri = "mongodb+srv://utUser:7iZ7NJ6vUkACuaJs@back-end.a4pzw.mongodb.net/test?retryWrites=true&w=majority";
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
   client.connect(async err => {
      if (err) {
         console.error(err);
      } else {
         // await addNewUser(client, {
         //    name: "Tester Testing1",
         //    birthday: "June 1, 2005",
         //    school: "UT Austin",
         // })
         // await addMultipleUsers(client, [
         //    {
         //       name: "Tester Testing8",
         //       birthday: "May 9, 2005",
         //       school: "Southern Methodist",
         //       age: 16,
         //    },
         //    {
         //       name: "Tester Testing9",
         //       birthday: "May 10, 2005",
         //       school: "Texas A&M",
         //       age: 12,
         //    },
         //    {
         //       name: "Tester Testing10",
         //       birthday: "May 11, 2005",
         //       school: "Rice",
         //       age: 19,
         //    },
         //    {
         //       name: "Tester Testing11",
         //       birthday: "May 10, 2005",
         //       school: "Texas A&M",
         //       age: 25,
         //    },
         //    {
         //       name: "Tester Testing12",
         //       birthday: "May 11, 2005",
         //       school: "Rice",
         //       age: 17,
         //    },
         // ])
         // await findOneUserByName(client, "Tester Testing6")
         await findUsersWithMinimumAge(client, 18)
         databasesList = await client.db().admin().listDatabases();
         
         console.log("Databases:");
         databasesList.databases.forEach(db => console.log(` - ${db.name}`));
         await client.close();
      }
   });
}

async function addNewUser(client, newUser) {
   const result = await client.db("test").collection("users").insertOne(newUser);
   console.log(result);
}

async function addMultipleUsers(client, newUsers) {
   const result = await client.db("test").collection("users").insertMany(newUsers);
   console.log(result.insertedCount + " documents created, the IDs of the documents are:")
   console.log(result.insertedIds)
}

async function findOneUserByName(client, userName) {
   const result = await client.db("test").collection("users").findOne({ name: userName });
   if (result) {
      console.log("There was a user with the name " + userName + ". The result is:")
      console.log(result)
   } else {
      console.log("There was no user in the database with the name " + userName + ". The result is:")
      // Result should be null
      console.log(result)
   }
}

async function findUsersWithMinimumAge(client, age) {
   const limitToNumResults = 7
   // Cursor allows traversal over a result set of a query
   const cursor = await client.db("test").collection("users").find({
      // gte = greater than or equal to
      age: { $gte: age }
   })
   .sort( { age: 1 })
   .limit(limitToNumResults);

   const results = await cursor.toArray();
   console.log(results)
}
main().catch(console.err)
