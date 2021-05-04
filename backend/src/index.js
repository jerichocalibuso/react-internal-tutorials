const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/create-todo", async (req, res) => {
  const { task } = req.body;
  const result = await prisma.todo.create({
    data: {
      task,
    },
  });
  res.json(result);
});

app.get("/get-todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.put("/update-todo/:id", async (req, res) => {
  const { id } = req.params;
  const { isDone } = await prisma.todo.findUnique({
    where: {
      id: String(id),
    },
  });
  const todo = await prisma.todo.update({
    where: {
      id: String(id),
    },
    data: {
      isDone: !isDone,
    },
  });
  res.json(todo);
});

app.delete("/delete-todo/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.delete({
    where: {
      id: String(id),
    },
  });
  res.json(todo);
});

const server = app.listen(3001, () =>
  console.log("🚀 Server ready at: http://localhost:3001")
);
