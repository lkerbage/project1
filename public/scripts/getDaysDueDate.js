export const getDaysDueDate = (todo) => {
    const today = Date.now();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = new Date(todo.dueDate).toLocaleDateString('de');

    if (date === new Date().toLocaleDateString('de')) {
        return 'Heute fällig';
    }
    if (date === new Date(tomorrow).toLocaleDateString('de')) {
        return 'Morgen fällig';
    }
    return `Fällig am ${date}`;
};