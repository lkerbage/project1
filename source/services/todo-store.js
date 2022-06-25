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
    const promise = this._db.insert(note);
    const resolved = await promise;
    console.log(resolved, 'RESOLVED');
    return this.all();
  }

  async update(note) {
    await this._db.update({ timestamp: (note.timestamp) }, { $set: note });
    return this._revision++;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const todoStore = new TodoStore();