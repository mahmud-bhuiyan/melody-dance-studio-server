const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 7000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5nrgbhc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // -----------------------------
    //           classes
    // -----------------------------
    const classesCollection = client.db("melodyDB").collection("classes");

    //get all classes
    app.get("/classes", async (req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
    });

    // -----------------------------
    //           reviews
    // -----------------------------
    const reviewsCollection = client.db("melodyDB").collection("reviews");

    //get all reviews
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    // -----------------------------
    //           cart
    // -----------------------------
    const cartCollection = client.db("melodyDB").collection("enrolled");

    //add to cart
    app.post("/enrolled", async (req, res) => {
      const item = req.body;
      const result = await cartCollection.insertOne(item);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch {
    console.log("An error occurred");
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("melody-dance-studio-server is running");
});

app.listen(port, () => {
  console.log(`melody-dance-studio-server is running on port ${port}`);
});
