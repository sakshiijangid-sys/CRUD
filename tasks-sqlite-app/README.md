# Tasks SQLite App

## Overview
This project is a simple application that utilizes a SQLite database to manage tasks. It creates a database named `tasks.db` and a table called `tasks` to store task information.

## Database Schema
The `tasks` table consists of the following columns:
- **id**: An integer that serves as the primary key for each task.
- **title**: A string that represents the title of the task.
- **done**: A boolean that indicates whether the task is completed.

## Example Tasks
Upon the first run of the application, three example tasks will be inserted into the database if the `tasks` table is empty. The example tasks are:
1. Title: "Buy groceries", Done: false
2. Title: "Read a book", Done: false
3. Title: "Go for a walk", Done: false

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- npm (Node Package Manager) which comes with Node.js.

### Installation
1. Clone the repository or download the project files.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the required dependencies:
   ```
   npm install
   ```

### Running the Application
To start the application, use the following command:
```
node src/index.js
```

This will establish a connection to the SQLite database, create the `tasks` table if it does not exist, and insert example tasks if the table is empty.

## License
This project is licensed under the MIT License.