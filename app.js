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

// 法1
const studentSchema = new Schema(
  {
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
  },
  {
    statics: {
      findAllMajorStudents(major) {
        return this.find({ major: major }).exec();
      },
    },
  }
);

// 法2
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

studentSchema.statics.findAllMajorStudents = function (major) {
  return this.find({ major: major }).exec();
};

// 法3
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

studentSchema.static("findAllMajorStudents", function (major) {
  return this.find({ major: major }).exec();
});

const Student = mongoose.model("Student", studentSchema);

Student.findAllMajorStudents("CS")
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(3000, () => {
  console.log("伺服器正在聆聽port 3000...");
});
