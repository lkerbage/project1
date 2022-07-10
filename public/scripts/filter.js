import {displayData} from './index.js';
import {ul} from "../constants/elements.js";
import {filter, statusFilter} from "../constants/form.js";

export const filterItems = (ev, filterData) => {
    const currentFilter = filter.value;
    const currentStatusFilter = statusFilter.value;

    let combinedFilter = filterData.sort((a, b) => {
        if (a[currentFilter] < b[currentFilter]) {
            return -1;
        }
        if (a[currentFilter] > b[currentFilter]) {
            return 1;
        }
        return 0;
    });
    let data = combinedFilter.filter((todo) => (currentStatusFilter !== 'a' ? todo.completed === Number(currentStatusFilter) : todo));

    if (data.length > 0) {
        displayData(data);
    } else {
        ul.innerHTML = "<h2 class='alignCenter'>Es sind keine Daten vorhanden</h2>"

    }

};