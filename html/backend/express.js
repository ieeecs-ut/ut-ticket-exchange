const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const development = process.env.NODE_ENV === 'development'
const port = development ? 3000 : 7500
app.listen(port, () => {
   console.log("listening on port " + port)
})

MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true }, (err, client) => {
   if (err) {
      console.error(err)
   } else {
      console.log("I am connected to the database!")
      const db = client.db('test')
      const collection = db.collection('sports')
      console.log(process.env.NODE_ENV)

      app.get('/events', (req, res) => {
         collection.find().toArray().then(events => {
            // console.log(events)
            res.send(events)
         }).catch(err => console.error(err))
      })
   }
})


