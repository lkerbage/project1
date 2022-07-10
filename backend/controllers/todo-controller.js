import {todoStore} from '../services/todo-store.js';

class TodoController {
    constructor(store) {
        this.getNotes = async (req, res) => {
            try {
                res.json(await store.all());
                console.log(await store.all());
            } catch (err) {
                res.status(500).json('DB failure when retrieving notes (get)');
            }
        };

        this.addNote = async (req, res, next) => {
            try {
                res.json(await store.add(req.body));
                res.send(req.body);
            } catch (err) {
                return next(err);
            }
        };

        this.updateNote = async (req, res, next) => {
            try {
                return res.json(await store.update(req.body));
            } catch (err) {
                return next(err);
            }
        };
    }
}

export const todoController = new TodoController(todoStore);