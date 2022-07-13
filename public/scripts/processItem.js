import { editItem } from './editItem.js';
import { showItemsByStatus } from './showItemsByStatus.js';
import { currentData } from './presentData.js';


export const processItem = (ev) => {
  const { id } = ev.target.dataset;
  if (ev.target.className === 'showByStatus') {
    showItemsByStatus(currentData);
  }
  if (ev.target.className === 'editButton') {
    editItem(currentData, id);
  }
};