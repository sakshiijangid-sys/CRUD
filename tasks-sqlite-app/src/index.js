const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tasks.db');

const { initDatabase } = require("./db");

(async () => {
  await initDatabase();

  // start your app here
})();

// Create the tasks table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done BOOLEAN NOT NULL
    )`);

    // Check if the table is empty
    db.get('SELECT COUNT(*) AS count FROM tasks', (err, row) => {
        if (err) {
            throw err;
        }

        if (row.count === 0) {
            // Insert example tasks
            const exampleTasks = [
                { title: 'Task 1', done: 0 },
                { title: 'Task 2', done: 0 },
                { title: 'Task 3', done: 1 }
            ];

            const stmt = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
            exampleTasks.forEach(task => {
                stmt.run(task.title, task.done);
            });
            stmt.finalize();
        }
    });
});

// Close the database connection
db.close();