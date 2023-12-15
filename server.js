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

//다이어리 가져오기
app.get("/diary/story", async (req, res) => {
  await client.connect();

  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  const skipValue = (currentPage - 1) * 8;

  try {
    const cursor = await post
      .find({ category: "story" })
      .sort({ created_at: -1 })
      .skip(skipValue)
      .limit(8)
      .toArray();

    const index = await counter.findOne({ name: "post" });

    Promise.all([cursor, index]).then(() => {
      res.send({ posts: cursor, total_length: index.totalPost });
    });
  } catch (err) {
    console.log(err);
  }
});

//울지말고 일어나 가져오기
app.get("/diary/overcome", async (req, res) => {
  await client.connect();
  res.send({ posts: [{ _id: 1, title: "더미데이터" }] });
});

//포스트 디테일 가져오기
app.get("/diary/detail", async (req, res) => {
  await client.connect();

  const _id = parseInt(req.query.id);
  console.log(_id);

  try {
    const cursor = await post.findOne({ _id: _id });
    console.log(cursor);
    res.send({ data: cursor });
  } catch (err) {
    console.log(err);
  }
});

//포스팅하기
app.post("/write", async (req, res) => {
  await client.connect();

  const index = await counter.findOne({ name: "post" });

  console.log(index);

  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
  const d = new Date();

  const date = new Date(d.getTime() + TIME_ZONE)
    .toISOString()
    .split("T")[0];
  const time = d.toTimeString().split(" ")[0];

  const created_at = date + " " + time;
  const increase_count = await counter.updateOne(
    { name: "post" },
    { $inc: { totalPost: 1, postSeq: 1 } }
  );
  const result = await post.insertOne({
    ...req.body,
    created_at: created_at,
    _id: index.postSeq + 1,
  });
});

//달력 데이터 가져오기
app.get("/calendar/:month", async (req, res) => {
  await client.connect();

  const this_month = req.params.month;
  const cursor = post.find({
    created_at: { $regex: new RegExp(this_month) },
  });

  const arr = [];

  for await (const doc of cursor) {
    arr.push(doc);
  }

  res.send({ postingData: arr });
});

app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "iamthunder/build/index.html"));
});

run().catch(console.dir);
