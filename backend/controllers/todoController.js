const db = require("../models");
const { Todo } = db;

const createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title wajib di isi" });
    }

    const todo = await Todo.create({ title, description, completed });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todos = await Todo.findByPk(id);
    if (!todos) {
      return res.status(404).json({ message: "Todo tidak ditemukan" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title wajib di isi" });
    }

    await todos.update({
      title,
      description,
      completed,
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo tidak ditemukan" });
    }

    await todo.destroy();

    res.status(200).json({
      message: "Todo berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
