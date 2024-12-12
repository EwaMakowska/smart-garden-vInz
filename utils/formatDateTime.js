function saveDateTime (date) {
    if(date && date.includes('/')) {
        const [day, month, year] = date.split('/');
        return new Date(`${year}-${month}-${day}`).toISOString();
    }
    return date
}

let formDate = {
    saveDateTime: saveDateTime
}

module.exports = formDate