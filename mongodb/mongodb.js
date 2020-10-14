const { MongoClient } = require('mongodb')

async function main() {
   const uri = "mongodb+srv://utUser:7iZ7NJ6vUkACuaJs@back-end.a4pzw.mongodb.net/test?retryWrites=true&w=majority";
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
   client.connect(async err => {
      if (err) {
         console.error(err);
      } else {
         // await findOneUserByName(client, "Tester Testing6")
         // await findUsersWithMinimumAge(client, 18)
         // await updateExistingUserByName(client, "Tester Testing3", { school: "Texas Tech" })
         // await updateAllUsersToHaveAge(client)
         // await deleteUserByAge(client, 11)
         // await deleteUsersWithLesserAge(client, 11)
         databasesList = await client.db().admin().listDatabases();
         
         console.log("Databases:");
         databasesList.databases.forEach(db => console.log(` - ${db.name}`));
         await client.close();
      }
   });
}

// -------------------------------- DELETE ---------------------------------

async function deleteUserByAge(client, userAge) {
   const result = await client.db("test").collection("users").deleteOne(
      {
         age: userAge
      }
   );

   console.log("The number of documents that were deleted were " + result.deletedCount)
}

async function deleteUsersWithLesserAge(client, userAge) {
   const result = await client.db("test").collection("users").deleteMany(
      {
         age: { $lt: userAge }
      }
   );

   console.log("The number of documents that were deleted were " + result.deletedCount)
}

// -------------------------------- UPDATE ---------------------------------

async function updateExistingUserByName(client, userName, updatedUser) {
   const result = await client.db("test").collection("users").updateOne(
      { name: userName }, 
      // Set new values for new or existing fields in the document
      // Document that we pass will not replace existing doc - any old fields there not in the updated document passed will remain the same
      { $set: updatedUser },
      // Replaces if a document with the name exists, otherwise it inserts the document
      { upsert: true }
   );

   console.log(result.matchedCount + " documents matched the query criteria")
   console.log(result.modifiedCount + " documents were updated")
   // console.log(result)
}

async function updateAllUsersToHaveAge(client) {
   const result = await client.db("test").collection("users").updateMany(
      {age: { $exists: false }},
      {$set: { age: 11 }}
   )
   console.log("The number of documents that needed to have an age field added was " + result.matchedCount)
   console.log("The number of documents that were eventually updated was " + result.modifiedCount)
}

// ---------------------------- CREATE --------------------------------

async function addNewUser(client, newUser) {
   const result = await client.db("test").collection("users").insertOne(newUser);
   console.log(result);
}

async function addMultipleUsers(client, newUsers) {
   const result = await client.db("test").collection("users").insertMany(newUsers);
   console.log(result.insertedCount + " documents created, the IDs of the documents are:")
   console.log(result.insertedIds)
}

// ------------------------------ READ --------------------------------

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
