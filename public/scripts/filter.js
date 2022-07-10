import {displayData} from './index.js';
import {ul} from "../constants/elements.js";

export const filterItems = (ev, data) => {
    const filterCriteria = ev.target.value;

    const filterData = data.sort((a, b) => {
        if (a[filterCriteria] < b[filterCriteria]) {
            return -1;
        }
        if (a[filterCriteria] > b[filterCriteria]) {
            return 1;
        }
        return 0;
    });
    displayData(
        filterCriteria === 'importance' ? filterData.reverse() : filterData,
    );
};

export const getCompleted = (s) => {
    if (s === 'y') {
        return '<ion-icon class="done" name="checkmark-circle-outline"></ion-icon>';
    }
    return '<ion-icon class="open" name="alert-outline"></ion-icon>';
};

export const completedItems = (ev, data) => {
    const filterCriteria = ev.target.value;
    const filterData = data.filter((todo) => (filterCriteria !== 'a' ? todo.completed === Number(filterCriteria) : todo));
    if (filterData.length > 0) {
        displayData(filterData);
    } else {
        ul.innerHTML = "<h2 class='alignCenter'>Es sind keine Daten vorhanden</h2>"

    }

};