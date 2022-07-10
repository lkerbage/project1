export const showImportance = (_importance) => {
    const flashes = [];
    for (let i = 0; i < _importance; i++) {
        flashes.push('<ion-icon name=\'flash\'></ion-icon>');
    }
    return flashes.join('')
};