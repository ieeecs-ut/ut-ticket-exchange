const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
// app.get('/events')

MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true }, (err, client) => {
   if (err) {
      console.error(err)
   } else {
      console.log("I am connected to the database!")
   }
})
