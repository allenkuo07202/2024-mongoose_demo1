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
  name: { type: String, required: true, maxlength: 25 },
  age: { type: Number, min: [0, "年齡不能小於0"] },
  // major: { type: String, required: [true, "每位學生都需要選至少一個主修"] },
  major: {
    type: String,
    required: function () {
      return this.scholarship.merit >= 3000;
    },
    // 若 merit >= 3000，則 major就是必填；若 merit < 3000，則不是必填
    enum: [
      "Chemistry",
      "Computer Science",
      "Mathematics",
      "Civil Engineering",
      "undecided",
    ],
    // 若所填的值，都不符合enum裡面的內容，就會出現問題
    // 這功能適合用在會員分級
  },

  scholarship: {
    merit: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },
});

const Student = mongoose.model("Student", studentSchema);

// required示範(若 merit >= 3000，則 major就是必填)
// let newStudent = new Student({
//   name: "Wilson",
//   age: 27,
//   scholarship: { merit: 1500, other: 2000 },
// });

// enum示範(major輸入enum以外的值)
// let newStudent = new Student({
//   name: "Jared",
//   age: 27,
//   major: "Nuclear Engineering",
//   scholarship: { merit: 1500, other: 2000 },
// });

// maxlength示範(name長度不能超過25)
let newStudent = new Student({
  name: "ahfladhfaliufhluifhuulsifhasilfhi",
  age: 27,
  major: "Computer Science",
  scholarship: { merit: 1500, other: 2000 },
});

newStudent
  .save()
  .then((data) => {
    console.log("資料儲存成功");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(3000, () => {
  console.log("伺服器正在聆聽port 3000...");
});
