import { displayData } from './index.js';
import { ul } from '../constants/elements.js';
import { sort, statusFilter } from '../constants/form.js';
import { currentData } from './store.js';

export const filterItems = () => {
  const currentFilter = sort.value;
  const currentStatusFilter = statusFilter.value;

  let combinedFilter = currentData.sort((a, b) => {
    if (a[currentFilter] < b[currentFilter]) {
      return -1;
    }
    if (a[currentFilter] > b[currentFilter]) {
      return 1;
    }
    return 0;
  });
  if (currentFilter === 'importance') {
    combinedFilter.reverse();
  }

  let data = combinedFilter.filter((todo) => (currentStatusFilter !== 'a' ? todo.completed === Number(currentStatusFilter) : todo));

  if (data.length > 0) {
    displayData(data);
  } else {
    ul.innerHTML = '<h2 class=\'alignCenter\'>Es sind keine Daten vorhanden</h2>';

  }

};