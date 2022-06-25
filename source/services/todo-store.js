import Datastore from 'nedb-promises';

class TodoStore {
  constructor() {
    const _options = { filename: './data/todo-notes.db', autoload: true };
    this._db = new Datastore(_options);
    this._revision = 0;
  }

  async all() {
    return this._db.find((el) => el).exec();
  }

  async add(note) {
    await this._db.insert(note);
    return this._revision++;
  }

  async update(note) {
    await this._db.update({ _id: (note._id) }, { $set: note });
    return this._revision++;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const todoStore = new TodoStore();