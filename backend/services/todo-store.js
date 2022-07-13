import Datastore from 'nedb-promises';

class TodoStore {
  constructor() {
    const _options = { filename: './backend/data/todo-notes.db' };
    this._db = new Datastore(_options);
  }

  async all() {
    return this._db.find((el) => el).exec();
  }

  async add(note) {
    return await this._db.insert(note);
  }

  async update(note) {
    return await this._db.update({ _id: note._id }, note, { returnUpdatedDocs: true });
  }
}

// eslint-disable-next-line import/prefer-default-export
export const todoStore = new TodoStore();