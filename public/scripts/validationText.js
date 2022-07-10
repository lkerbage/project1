import {dueDate, importance, title} from '../constants/form.js';
import {ErrorMessages} from '../constants/enums.js';

export const validationText = () => {
    if (title.validity.valueMissing) {
        title.setCustomValidity(ErrorMessages.ERROR_TITLE);
    } else {
        title.setCustomValidity('');
    }
    if (importance.validity.rangeUnderflow || importance.validity.valueMissing) {
        importance.setCustomValidity(ErrorMessages.IMPORTANCE);
    } else {
        importance.setCustomValidity('');
    }
    if (dueDate.validity.valueMissing) {
        dueDate.setCustomValidity(ErrorMessages.DUE_DATE);
    } else {
        dueDate.setCustomValidity('');
    }
};