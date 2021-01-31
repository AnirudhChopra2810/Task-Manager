const express = require("express");
const fs = require("fs");
const FILE_PATH = "./list.file";
const router = express.Router();

const addTodo = (req, res) => {
  try {
    const { todoList } = req.body;
    fs.writeFileSync(FILE_PATH, JSON.stringify(todoList));
    return res.send({ success: true, message: "List updated successfully" }); // default status is 200
  } catch (error) {
    console.log(error);
    return res.status(500).send("Oops something broke! :(");
  }
};

const getTodo = (req, res) => {
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
};

router.route("/addList").post(addTodo);
router.route("/getList").get(getTodo);

module.exports = router;
