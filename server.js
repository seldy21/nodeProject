const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(express.json());
var cors = require("cors");
app.use(cors());

const uri =
  "mongodb+srv://seldy:aWsoNzPz92KBt26j@cluster0.ivnuyfr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let post, counter, login;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("TodayILearned").command({ ping: 1 });
    const db = client.db("TodayILearned");
    post = db.collection("post");
    counter = db.collection("counter");
    login = db.collection("login");

    app.listen(8080, function () {
      console.log("listening on 8080");
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

app.use(express.static(path.join(__dirname, "iamthunder/build")));

app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "iamthunder/build/index.html"));
});

app.get("/diary/story", async (req, res) => {
  await client.connect();

  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  const skipValue = (currentPage - 1) * 8;

  try {
    const cursor = await post
      .find({})
      .sort({ created_at: -1 })
      .skip(skipValue)
      .limit(8)
      .toArray();

    const index = await counter.findOne({ name: "게시물 개수" });

    res.send({ posts: cursor, total_length: index.totalPost });
  } catch (err) {
    console.log(err);
  }
  // try {
  //   const cursor = await post.find().toArray();
  //   res.send({ posts: cursor });
  // } catch (error) {
  //   console.error("Error fetching data from MongoDB:", error);
  //   res.status(500).send("Internal Server Error");
  // }
});

app.get("/diary/overcome", async (req, res) => {
  await client.connect();
  res.send({ posts: [{ _id: 1, title: "더미데이터" }] });
});

app.post("/write", async (req, res) => {
  await client.connect();

  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
  const d = new Date();

  const date = new Date(d.getTime() + TIME_ZONE).toISOString().split("T")[0];
  const time = d.toTimeString().split(" ")[0];

  const created_at = date + " " + time;
  const index = await counter.updateOne(
    { name: "게시물 개수" },
    { $inc: { totalPost: 1 } }
  );
  const result = await post.insertOne({ ...req.body, created_at: created_at });
});

app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "iamthunder/build/index.html"));
});

run().catch(console.dir);
