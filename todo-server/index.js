const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.nhg2oh1.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      
      const taskCollection = client.db("todo").collection("todo");

      app.get("/tasks", async (req, res) => {
        let query = {};
        if (req.query.priority) {
          query.priority = req.query.priority;
        }
        const cursor = taskCollection.find(query);
        const tasks = await cursor.toArray();
        res.send({ status: true, data: tasks });
      });

      app.post("/task", async (req, res) => {
        const task = req.body;
        const result = await taskCollection.insertOne(task);
        res.send(result);
      });

      app.get("/task/:id", async (req, res) => {
        const id = req.params.id;
        const result = await taskCollection.findOne({ _id: ObjectId(id) });
        // console.log(result);
        res.send(result);
      });

      app.delete("/task/:id", async (req, res) => {
        const id = req.params.id;
        const result = await taskCollection.deleteOne({ _id: ObjectId(id) });
        // console.log(result);
        res.send(result);
      });

      // status update
      app.put("/task/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const task = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            isCompleted: task.isCompleted,
            task: task.task,
            description: task.description,
            priority: task.priority,
          },
        };
        const options = { upsert: true };
        const result = await taskCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        res.json(result);
      });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Todo Running");
});

app.listen(port, () => {
  console.log("port no", port);
});