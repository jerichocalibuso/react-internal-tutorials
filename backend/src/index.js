const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// app.post("/todo", async (req, res) => {
//   const { task } = req.body;
//   const result = await prisma.todo.create({
//     data: {
//       task,
//     },
//   });
//   res.json(result);
// });

// app.get("/todos", async (req, res) => {
//   const todos = await prisma.todo.findMany();
//   res.json(todos);
// });

// app.put("/todo/:id", async (req, res) => {
//   const { id } = req.params;
//   const { isDone } = await prisma.todo.findUnique({
//     where: {
//       id: String(id),
//     },
//   });
//   const todo = await prisma.todo.update({
//     where: {
//       id: String(id),
//     },
//     data: {
//       isDone: !isDone,
//     },
//   });
//   res.json(todo);
// });

// app.delete("/todo/:id", async (req, res) => {
//   const { id } = req.params;
//   const todo = await prisma.todo.delete({
//     where: {
//       id: String(id),
//     },
//   });
//   res.json(todo);
// });

// Create project
app.post("/projects", async (req, res) => {
  const { title } = req.body;
  try {
    const project = await prisma.project.create({
      data: {
        title: title,
      },
    });
    res.json(project);
  } catch (e) {
    console.error(`Error on creating a project, Error: ${e}`);
  }
});

// Get projects and its todos
app.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        todos: true,
      },
    });
    res.json(projects);
  } catch (e) {
    console.error(`Error on updating a project todo, Error: ${e}`);
  }
});

// Add project todo
app.post("/projects/:id", async (req, res) => {
  const { id: projectId } = req.params;
  const { task } = req.body;

  try {
    const result = await prisma.todo.create({
      data: {
        task: task,
        Project: { connect: { id: Number(projectId) } },
      },
    });

    res.json(result);
  } catch (e) {
    console.error(`Error on creating a project todo, Error: ${e}`);
  }
});
// Update project todo
app.put("/projects/:id", async (req, res) => {
  const { id: taskId, isDone } = req.body;

  try {
    const result = await prisma.todo.update({
      where: {
        id: Number(taskId),
      },
      data: {
        isDone: !isDone,
      },
    });
    res.json(result);
  } catch (e) {
    console.error(`Error on updating a project todo, Error: ${e}`);
  }
});

const server = app.listen(3001, () =>
  console.log("🚀 Server ready at: http://localhost:3001")
);
