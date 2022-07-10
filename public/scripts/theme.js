import {toggle} from '../constants/elements.js';
import {Theme} from '../constants/enums.js';

export const setTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    }
    else {localStorage.setItem('theme', Theme.LIGHT);}

    toggle.onclick = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = Theme.LIGHT;

        if (currentTheme === Theme.LIGHT) {
            targetTheme = Theme.DARK;
        }
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    };
};