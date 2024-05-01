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
  age: Number,
  major: String,
  scholarship: {
    merit: Number,
    other: Number,
  },
});

const Student = mongoose.model("Student", studentSchema);
// 法1
// Student.find({})
//   .exec()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// .find()這個method，return的是query
// 再接.exec()，return的是promise
// 所以後面就可以再接.then()

// 在find裡面放一個empty object，意思是要去找students這個collection的所有資料
// 當promise變成fulfilled的時候，就會自動執行then()裡面的callback function

//法2 用async function
// async function findStudent() {
//   try {
//     let data = await Student.find().exec();
//     console.log(data);
//   } catch (e) {
//     console.log(e);
//   }
// }

app.get("/", async (req, res) => {
  try {
    let data = await Student.find().exec();
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

app.get("/findOne", async (req, res) => {
  try {
    let data = await Student.findOne({ name: "Grace" }).exec();
    console.log(data);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => {
  console.log("伺服器正在聆聽port 3000...");
});
