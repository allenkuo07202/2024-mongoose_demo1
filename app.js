const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;

app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/exampleDB")
  .then(() => {
    console.log("成功連結mongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });
// why是27017，在cmd輸入指令mongosh即可知道
// 要連結哪個database？在cmd輸入指令show dbs即可知道目前有哪些database

const studentSchema = new Schema({
  name: String,
  age: { type: Number, min: [0, "年齡不能小於0"] },
  major: String,
  scholarship: {
    merit: Number,
    other: Number,
  },
});

const Student = mongoose.model("Student", studentSchema);

Student.deleteOne({ name: "Wilson" })
  .exec()
  .then((msg) => {
    console.log(msg);
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(3000, () => {
  console.log("伺服器正在聆聽port 3000...");
});
