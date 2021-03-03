const express = require("express");
const fs = require("fs");
const FILE_PATH = "../list.file";
const Todo = require("../model/todoModel");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addTodo = async (req, res) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);
    const verify = await jwt.verify(JSON.parse(token), process.env.JWT_SECRET);

    if (!verify) return res.send("invalid Token");

    const user = await User.findOne({ _id: verify.id });

    if (!user) return res.send("User not found");

    const todoList = await Todo.create({
      Todo: req.body.Todo,
      Key: req.body.Key,
      Date: req.body.Date,
    });

    return res.send({ success: true, message: "List updated successfully" }); // default status is 200
  } catch (error) {
    console.log(error);
    return res.status(500).send("Oops something broke! :(");
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);
    const verify = await jwt.verify(JSON.parse(token), process.env.JWT_SECRET);

    if (!verify) return res.send("invalid Token");

    const user = await User.findOne({ _id: verify.id });

    if (!user) return res.send("User not found");

    console.log(req.body);
    const findTodo = await Todo.findOneAndUpdate(
      {
        Todo: req.body.EditTodo,
        Key: verify.id,
      },
      {
        Todo: req.body.Todo,
      }
    );

    return res.send({ success: true, message: "List updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Oops something broke! :(");
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);
    const verify = await jwt.verify(JSON.parse(token), process.env.JWT_SECRET);

    if (!verify) return res.send("invalid Token");

    const user = await User.findOne({ _id: verify.id });

    if (!user) return res.send("User not found");
    console.log(req.body.Key);

    console.log(req.body.Todo);

    const deleteTodo = await Todo.findOneAndDelete({
      Key: verify.id,
      Todo: req.body.Todo,
    });
    return res.send({ success: true, message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Oops something broke! :(");
  }
};

exports.getTodo = async (req, res) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);
    const verify = await jwt.verify(JSON.parse(token), process.env.JWT_SECRET);

    console.log(verify.id);

    if (!verify) return res.send("invalid Token");

    const user = await User.findOne({ _id: verify.id });

    if (!user) return res.send("User not found");

    const todo = await Todo.find({ Key: verify.id });

    res.send({
      Todo: todo,
      id: verify.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Oops something broke! :(");
  }
};
