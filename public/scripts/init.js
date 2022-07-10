import {
    createButton,
    form,
    overview,
    selectorDisplayBottom,
    selectorDisplayTop,
    showByStatus,
    todoFilter,
    todoFilters,
    todoList,
    themeSwitcher,
    ul,
} from '../constants/elements.js';
import {Display} from '../constants/enums.js';
import {setTheme, toggleTheme} from './theme.js';
import {validationText} from './validationText.js';
import {processItem} from './process-item.js';
import {filterItems} from './filter.js';
import {displayParts} from './displayParts.js';
import {displayData} from './index.js';
import {fetchData} from '../services/fetch.js';
import {submit} from './submit.js';
import {createNewTodo} from "./createNewTodo.js";
import {overview as overviewFunction} from "./overview.js";


export async function init() {
    displayParts(selectorDisplayTop, Display.NONE);
    displayParts(selectorDisplayBottom, Display.BLOCK);
    setTheme();
    const data = await fetchData('GET');
    if (data.length > 0) {
        await displayData(data);
    } else {
        todoFilters.style.display = Display.NONE;
        ul.innerHTML = '<h2 class="alignCenter">Du bist frei 😀 Es gibt heute nichts zu machen!</h2>';
    }

    form.addEventListener('submit', async (ev) => {
       await submit(ev, data);
    });
    form.addEventListener('click', validationText);
    todoList.addEventListener('click', (ev) => {
        processItem(ev, data);
    });
    todoFilter.addEventListener('change', (ev) => filterItems(ev, data));
    showByStatus.addEventListener('change', (ev) => filterItems(ev, data));
    createButton.addEventListener('click', () => {
        createNewTodo()
    });
    overview.addEventListener('click', () => {
        overviewFunction()
    });
    themeSwitcher.addEventListener('click', () => {
        setTheme();toggleTheme()
    });
}