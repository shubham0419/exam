const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.DATABASE_URL || "mongodb+srv://shubham:shubham@endtermexam.cfs9b.mongodb.net/?retryWrites=true&w=majority&appName=endtermexam").then(()=>{
  console.log("Connected to MongoDB");
}).catch(()=>{
  console.log(process.env.DATABASE_URL)
  console.log("Failed to connect to MongoDB");
})

const emojiSchema = new mongoose.Schema({
  emoji: String, 
  name: String, 
  keywords: [String]
});

const Emoji = mongoose.model("Emoji",emojiSchema);

app.get("/",(req,res)=>{
  res.send("Hello Student");
})

app.get("/emoji/",async (req, res) => {
  const emojis = await Emoji.find({});
  res.json(emojis);
});


app.get("/emoji/:name",async (req, res) => {
  const {name} = req.params;
  console.log(name);
  const emojis = await Emoji.find({ name: { $regex: name, $options: 'i' } });
  res.json(emojis);
});


app.listen(PORT, () => console.log("Server running on port " + PORT));