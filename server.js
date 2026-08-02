const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const {
  initDatabase,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'Task API',
    version: '1.0',
    endpoints: ['/tasks'],
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  const taskId = Number(req.params.id);

  if (Number.isNaN(taskId)) {
    return res.status(404).json({ error: 'Task not found' });
  }

  try {
    const task = await getTaskById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and cannot be empty' });
  }

  try {
    const newTask = await createTask(title.trim());
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const taskId = Number(req.params.id);
  const { title, done } = req.body;

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'title cannot be empty' });
  }

  if (done !== undefined && typeof done !== 'boolean') {
    return res.status(400).json({ error: 'done must be a boolean' });
  }

  if (title === undefined && done === undefined) {
    return res.status(400).json({ error: 'request body must include title and/or done' });
  }

  try {
    const updatedTask = await updateTask(taskId, title === undefined ? undefined : title.trim(), done);

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const taskId = Number(req.params.id);

  try {
    const deleted = await deleteTask(taskId);

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Express server is running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database', err);
    process.exit(1);
  });