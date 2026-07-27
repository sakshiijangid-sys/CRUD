# Task API

A small Express CRUD API for managing tasks in memory. It is designed for the workshop stages and includes Swagger UI documentation.

## Run locally

```bash
npm install
npm start
```

The API will be available at:
- http://localhost:3000/
- http://localhost:3000/health
- http://localhost:3000/docs

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | / | API overview |
| GET | /health | Health check |
| GET | /tasks | List tasks |
| GET | /tasks/:id | Get one task |
| POST | /tasks | Create a task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |
| GET | /stats | Task summary |
| POST | /reset | Reset the in-memory store |

## Example requests

```bash
curl -i http://localhost:3000/tasks
```

Example response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[{"id":1,"title":"Buy groceries","done":false}]
```

## Notes

This API uses in-memory storage, so restarting the server resets all tasks.
