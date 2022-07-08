import { httpService } from './http-service.js';

class TodoServices {
  // todo ev. spread
  async add(newTodo) {
    return httpService.ajax('POST', '/notes/', { name: { ...newTodo } });
  }

  async all() {
    return httpService.ajax('GET', '/notes/', undefined);
  }

  async update(note) {
    return await this._db.update({ _id: note._id }, note, { returnUpdatedDocs: true });
  }
}

export const todoServices = new TodoServices();