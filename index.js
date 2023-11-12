const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//  middeware-------
app.use(cors());
app.use(express.json());
//  middeware-------END

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gzl03ny.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // const database = client.db("insertDB");
    // const haiku = database.collection("haiku");
    const mongodbDatabase = client.db("coffeeStor").collection("storData");
    // AddCoffee-----------
    app.post('/addCoffee', async(req, res)=>{
      const newCoffee = req.body;
      // console.log(newCoffee);
      const result = await mongodbDatabase.insertOne(newCoffee);
      res.send(result);
    })
    // get Coffee----
    app.get('/addCoffee', async (req, res) =>{
        const cursor = mongodbDatabase.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    // Delete---------------
    app.delete('/addCoffee/:id', async (req, res)=>{
      const id = req.params.id;
      const findID = {_id: new ObjectId(id)};
      const cursor =await mongodbDatabase.deleteOne(findID);
      res.send(cursor);
    })
// find Id ------------server 
    app.get('/addCoffee/:id', async (req, res)=>{
      const id = req.params.id;
      const cursor = {_id: new ObjectId(id)};
      const result = await mongodbDatabase.findOne(cursor);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})