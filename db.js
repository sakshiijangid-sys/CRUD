const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tasks.db');

function runSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function getSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function allSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function initDatabase() {
  await runSql(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL
  )`);
}

function mapTask(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    done: Boolean(row.done),
  };
}

async function getAllTasks() {
  const rows = await allSql('SELECT id, title, done FROM tasks');
  return rows.map(mapTask);
}

async function getTaskById(id) {
  const row = await getSql('SELECT id, title, done FROM tasks WHERE id = ?', [id]);
  return mapTask(row);
}

async function createTask(title) {
  const result = await runSql('INSERT INTO tasks (title, done) VALUES (?, ?)', [title, 0]);
  return getTaskById(result.lastID);
}

async function updateTask(id, title, done) {
  const existing = await getTaskById(id);
  if (!existing) {
    return null;
  }

  const updatedTitle = title !== undefined ? title : existing.title;
  const updatedDone = done !== undefined ? (done ? 1 : 0) : (existing.done ? 1 : 0);

  await runSql('UPDATE tasks SET title = ?, done = ? WHERE id = ?', [updatedTitle, updatedDone, id]);
  return getTaskById(id);
}

async function deleteTask(id) {
  const result = await runSql('DELETE FROM tasks WHERE id = ?', [id]);
  return result.changes > 0;
}

module.exports = {
  initDatabase,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

