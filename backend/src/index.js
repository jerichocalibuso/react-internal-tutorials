const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

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

// Get projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (e) {
    console.error(`Error on updating a project todo, Error: ${e}`);
  }
});

// Get projects todos
app.get("/projects/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const todos = await prisma.project.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        todos: true,
      },
    });
    res.json(todos);
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

const PORT = 5001;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);
