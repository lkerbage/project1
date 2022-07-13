import { submitButton } from '../constants/elements.js';

export const changeButton = (innerHtml, className) => {
  submitButton.innerHTML = innerHtml;
  submitButton.className = className;
};