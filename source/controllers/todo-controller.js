import { todoStore } from '../services/todo-store.js';

class TodoController {
  constructor(store) {
    this.getRevision = async (req, res) => {
      res.json(await store.revision());
    };

    this.getNotes = async (req, res) => {
      try {
        res.json(await store.all());
      } catch (err) {
        res.status(500).json('DB failure when retrieving notes (get)');
      }
    };

    this.addNote = async (req, res) => {
      try {
        res.json(await store.add(req.body));
        res.send(req.body);
      } catch {
        res.status(500).json('DB failure when retrieving notes (POST))');
      }
    };

    this.updateNote = async (req, res) => {
      try {
        res.json(await store.update(req.body.note));
      } catch (err) {
        res.status(500).json('DB failure when retrieving notes (update))');
      }
    };
  }
}

export const todoController = new TodoController(todoStore);