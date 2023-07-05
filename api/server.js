const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Todo = require("./models/Todo");

const app = express();

//! 1. => Middleware
app.use(express.json());
app.use(cors());

//! 2. => MongoDB Bağlantısı
mongoose
  .connect(
    "mongodb+srv://emre123:Emre1903...188148@cluster0.5szwgta.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

//! 4. => Post Todo
app.post("/todo/add-todo", (req, res) => {
  const todo = new Todo({ text: req.body.text });
  todo.save();
  res.json(todo);
});

//! 5. => Get Todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

//! 6. => Delete Todo
app.delete("/todo/delete-todo/:id", async (req, res) => {
  const { id } = await Todo.findByIdAndDelete(req.params.id);
  res.json(id);
});

//! 7. => Update Todo
app.put("/todo/update-todo/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.text = req.body.text;
  todo.save();
  res.json(todo);
});

//! 8. => Complete Todo
app.get("/todo/complete-todo/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
});

//! 3. => Port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
