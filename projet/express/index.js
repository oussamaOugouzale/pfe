var express = require('express')
var Mongoclient = require('mongodb').MongoClient
var cors = require('cors')
var password = encodeURIComponent('w7RZvXvh@3Zpvc3OXg')


var app = express()
app.use(cors())
var CONNECTION_STRING = "mongodb+srv://Oussama:OussamaMongo@mycluster.mgcih3n.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster"



var DATABASENAME = "emotions"
var database

app.listen(5000, () => {
    Mongoclient.connect(CONNECTION_STRING, (error, client) => {
        database = client.db(DATABASENAME)
        console.log("successefull")
    })
})