import Datastore from 'nedb-promises';

class TodoStore {
  constructor() {
    const _options = { filename: './data/todo-notes.db' };
    this._db = new Datastore(_options);
    this._revision = 0;
  }

  async all() {
    return this._db.find((el) => el).exec();
  }

  async add(note) {
    return await this._db.insert(note);
  }

  async update(note) {
    return await this._db.update({ timestamp: note.timestamp }, {
      $set: {
        note,
      },
    });
  }
}

// eslint-disable-next-line import/prefer-default-export
export const todoStore = new TodoStore();