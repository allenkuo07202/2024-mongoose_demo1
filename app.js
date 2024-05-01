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

// 新增資料(會去看Schema的設定條件)
// let newStudent = new Student({
//   name: "Wilson",
//   age: 27,
//   major: "Computer Science",
//   scholarship: {
//     merit: 5000,
//     other: 2000,
//   },
// });

// newStudent
//   .save()
//   .then((data) => {
//     console.log("成功儲存新學生資訊");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// 更新資料
// Student.updateOne({ name: "Esther" }, { name: "Esther Lam" })
//   .exec()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// Student.updateOne(
//   { name: "Esther Lam" },
//   { age: 27 },
//   { runValidators: true, new: true }
//   // 要設定3rd參數，它才會去看Schema的設定條件
//   // new: true對updateOne無效
// )
//   .exec()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// Student.findOneAndUpdate(
//   { name: "Grace Xie" },
//   { name: "Grace" },
//   { runValidators: true, new: true }
//   // 設定new屬性為true，則會直接看到更新完成的document(不用查詢就看得到)
// )
//   .exec()
//   .then((newData) => {
//     console.log(newData);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

Student.find({ "scholarship.merit": { $gte: 5000 } })
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });

// 查詢資料
// Student.find({})
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

app.listen(3000, () => {
  console.log("伺服器正在聆聽port 3000...");
});
