export const showImportance = (_importance) => {
    const flashes = [];
    for (let i = 0; i < _importance; i++) {
        flashes.push('<ion-icon name=\'flash\'></ion-icon>');
    }
    return flashes.join('')
};

export const getCompleted = (s) => {
    if (s === 'y') {
        return '<ion-icon class="done" name="checkmark-circle-outline"></ion-icon>';
    }
    return '<ion-icon class="open" name="alert-outline"></ion-icon>';
};