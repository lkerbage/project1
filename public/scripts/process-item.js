import {editItem} from "./editItem.js";
import {showItemsByStatus} from "./showItemsByStatus.js";


export const processItem = (ev, data) => {
    const {id} = ev.target.dataset;
    if (ev.target.className === 'showByStatus') {
        showItemsByStatus(data)
    }
    if (ev.target.className === 'editButton') {
        editItem(data, id)
    }
};