const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSS}@cluster0.mndvni1.mongodb.net/?appName=Cluster0`;

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
    // Send a ping to confirm a successful connection
    
    
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello World! Server is running!');
});


// POST route to create a new parcel
app.post('/parcel', async (req, res) => {
  try {
    const { parcelName, parcelType, senderDistrict, receiverDistrict, cost, createdBy } = req.body;
    
    // Prepare data for insertion
    const parcelData = {
      parcelName,
      parcelType,
      senderDistrict,
      receiverDistrict,
      cost,
      createdAt: new Date(), // Use the current timestamp
      createdBy, // user info
    };
    
    // Insert the new parcel into the 'parcels' collection
    
    const db=client.db("parcelBD");
    const result = await db.collection('parcels').insertOne(parcelData);

    // Respond with success
    res.status(201).json({
      message: 'Parcel created successfully!',
      
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});