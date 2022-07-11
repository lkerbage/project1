import {showUpdateItem} from "./showUpdateItem.js";
import {displayParts} from "./displayParts.js";
import {selectorDisplayBottom, selectorDisplayTop, submitButton} from "../constants/elements.js";
import {Display} from "../constants/enums.js";
import {displayData} from "./index.js";

const changeButton = () => {
    submitButton.innerHTML = 'Bearbeiten';
    submitButton.className = 'create-button js-edit-todo';
};

export const editItem = (data, id) => {
    console.log(data)
    showUpdateItem(data[id]);
    displayParts(selectorDisplayTop, Display.BLOCK);
    displayParts(selectorDisplayBottom, Display.NONE);
    changeButton();
    displayData(data);
}