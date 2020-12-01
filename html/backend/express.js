const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
// app.get('/events')

const uri = "mongodb+srv://utUser:7iZ7NJ6vUkACuaJs@back-end.a4pzw.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
   if (err) {
      console.error(err)
   } else {
      console.log("I am connected to the database!")
   }
})
