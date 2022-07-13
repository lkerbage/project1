import { httpService } from './http-service.js';

class TodoServices {
  async add(newTodo) {
    return httpService.ajax('POST', '/notes/', { name: { ...newTodo } });
  }

  async all() {
    return httpService.ajax('GET', '/notes/', undefined);
  }

  async update(note) {
    // return await this._db.update({_id: note._id}, note, {returnUpdatedDocs: true});
    return httpService.ajax('PUT', '/notes/', { name: { ...note } });

  }
}

export const todoServices = new TodoServices();