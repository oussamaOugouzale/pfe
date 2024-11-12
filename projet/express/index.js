const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(bodyParser.json());

const { MongoClient, ObjectId } = require('mongodb');


app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const result = await authentification(email, password)
    res.json({ result })
})

app.post('/register', async (req, res) => {
    const { email, password } = req.body
    console.log("hello")
    result =  await insert(email, password)
    res.json({result})
})

async function insert(email, password) {
    const collection = client.db("Emotions").collection("Users");

    try {
        const documents = await collection.find().sort({ id: -1 }).limit(1).toArray();
        
        let dernierId = 0;
        if (documents.length > 0) {
            dernierId = +documents[0].id
        }
        
        const nouveauDocument = {
            "_id": new ObjectId(),
            "id": dernierId + 1,
            "email": email,
            "password": password
        };
        
        await collection.insertOne(nouveauDocument);
        return true
    } catch (error) {
        return false
    }
}

async function authentification(email, password) {
    const collection = client.db("Emotions").collection("Users")
    const userEmail = await collection.findOne({ email: email })
    const user = await collection.findOne({ email: email, password: password })
    return { email: userEmail != null, user: user != null }
}

var client
async function connection() {
    const uri = "mongodb+srv://Oussama:OussamaMongo@mycluster.mgcih3n.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";
    client = new MongoClient(uri);

    try {
        await client.connect()
        console.log("connected to mongoDb")
    } catch {
        console.log("not connected to database")
    }
}
connection()

app.listen(5000, () => {
    console.log("server is running on 5000")
})

// main().catch(console.error);
