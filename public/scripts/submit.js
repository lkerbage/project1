import {completed, description, dueDate, importance, title,} from '../constants/form.js';
import {selectorDisplayBottom, selectorDisplayTop, submitButton} from '../constants/elements.js';
import {processItem} from './process-item.js';
import {displayParts} from './displayParts.js';
import {Display} from '../constants/enums.js';
import {displayData} from './index.js';
import {fetchData} from '../services/fetch.js';

const submitTodo = async () => {
    const data = await fetchData('GET');
    const note = {
        title: title.value,
        importance: importance.value,
        dueDate: dueDate.value,
        completed: Number(completed.checked),
        description: description.value,
        timestamp: Date.now(),
    };
    if (submitButton.className === 'create-button js-create-new-todo') {

        await fetchData('POST', note).then((res) => {
            console.log("data in submitTodo: ", data)
            displayData([...data, {...res}]);
        });
    }
    if (submitButton.className === 'create-button js-edit-todo') {
        await fetchData('PUT', note).then((res) => {
            data.map((item) => {
                if (item._id === res._id) {
                    return res;
                }
                return item;
            });
            displayData([...data, {...res}]);
        });
    }
};

export const submit = async (ev, data) => {
    ev.preventDefault();
    await submitTodo(data);
    processItem(ev, data);
    displayParts(selectorDisplayTop, Display.NONE);
    displayParts(selectorDisplayBottom, Display.BLOCK);
};