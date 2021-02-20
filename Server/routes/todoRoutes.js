const express = require("express");
const todoController = require("./../controllers/todoController");
const router = express.Router();

router.route("/addList").post(todoController.addTodo);
router.route("/getList").get(todoController.getTodo);
router.route("/updateList").post(todoController.updateTodo);
router.route("/DeleteList").post(todoController.deleteTodo);

module.exports = router;
