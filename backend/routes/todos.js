const express = require("express");
const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

// tambah todo
router.post("/", createTodo);

// get all todo
router.get("/", getTodo);

// edit todo
router.put("/:id", updateTodo);

// apus todo 
router.delete("/:id", deleteTodo)

module.exports = router;