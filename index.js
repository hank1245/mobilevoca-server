const express = require("express");
const cors = require("cors");
const User = require("./models/userSchema");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();
app.set("port", process.env.PORT || 5001);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//단어 가져오기
app.get("/words", async (req, res) => {
  const me = await User.findOne({ name: "hank" }).exec();
  res.json(me.words);
});
//유저 생성
app.post("/user", async (req, res) => {
  const me = new User({
    name: "hank",
    words: [],
  });
  const user = await User.create(me);
  res.json(user);
});

//단어 추가
app.post("/word", async (req, res) => {
  const word = req.body;
  const me = await User.findOne({ name: "hank" }).exec();
  const saved = me.words;
  let user = await User.findOneAndUpdate({
    name: "hank",
    words: [...saved, word],
  });
  res.json(user);
});
//root
app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
