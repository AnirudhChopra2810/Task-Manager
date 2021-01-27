const express = require("express");
const app = express();
const path = require("path");
const staticPath = path.join(__dirname, "../client/build");
const fs = require("fs");
const bodyParser = require("body-parser");
const FILE_PATH = "./list.file";

const cors = require("cors");
app.use(cors());
// const staticPath2 = path.join(__dirname, "./login");
//const bcrypt = require("bcrypt");

//const FILE_PATH2 = "./users.file";

//let arr = JSON.parse(fs.readFileSync(FILE_PATH2, "utf-8"));

app.use(express.static(staticPath));
//app.use("/loggedIn", express.static(staticPath2));

app.use(bodyParser.json());

// app.post("/users/login", async (req, res) => {
//   for (i = 0; i < arr.length; i++) {
//     console.log(arr[i].username);
//     console.log(req.body.username);
//     if (arr[i].username == req.body.username) {
//       try {
//         if (await bcrypt.compare(req.body.password, arr[i].password)) {
//           return res.send({ success: true, message: "Password Matched" });
//         } else {
//           return res.send({ success: false, message: "Password Not Matched" });
//         }
//       } catch {
//         return res.status(500).send("oops something broke :(");
//       }
//     }
//      else {
//        res.send({ success: false, message: "User Not Found" });
//     }
//   }
// });

// app.post("/users", async (req, res) => {
//   try {
//     console.log(req.body.password);
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const user = {
//       username: req.body.username,
//       password: hashedPassword,
//     };
//     arr.push(user);
//     fs.writeFileSync(FILE_PATH2, JSON.stringify(arr));
//     return res.send({ success: true, message: "List updated successfully" });
//   } catch {
//     return res.status(500).send("Oops something broke! :(");
//   }
// });

// app.get("/", (req, res) => {
//   try {
//     if (!fs.existsSync(FILE_PATH2)) {
//       return res
//         .status(404)
//         .send({ success: false, message: "List does not exists" });
//     }
//     const file = JSON.parse(fs.readFileSync(FILE_PATH2, "utf-8"));

//     return res.send({ success: true, data: file }); // default status is 200
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send("Oops something broke! :(");
//   }
// });

app.post("/addList", (req, res) => {
  try {
    const { todoList } = req.body;
    fs.writeFileSync(FILE_PATH, JSON.stringify(todoList));
    return res.send({
      success: true,
      message: "List updated successfully and i worked ",
    }); // default status is 200
  } catch (error) {
    console.log(error);
    return res.status(500).send("Oops something broke! :(");
  }
});

app.get("/getList", (req, res) => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      return res
        .status(404)
        .send({ success: false, message: "List does not exists" });
    }
    const file = fs.readFileSync(FILE_PATH);
    const jsonData = JSON.parse(file.toString());
    return res.send({ success: true, data: jsonData }); // default status is 200
  } catch (error) {
    console.log(error);
    return res.status(500).send("Oops something broke! :(");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
