const handleError = function (error) {
    if (error.message.includes('is required')) {
        const match = error.message.match(/Path `(.*?)` is required/);
        const requiredField = match ? match[1] : '';
        return `Pole <b>${requiredField}</b> nie może być puste.`
    }
    if (error.message.includes('E11000')) {
        const match = error.message.match(/dup key: { name: "(.*?)" }/);
        const duplicateName = match ? match[1] : '';
        return `Nazwa <b>${duplicateName}</b> już występuje. Proszę wybrać inną nazwe.`
    }
    return `Wystąpił niezidentyfikowany problem. Proszę, spróbuj ponownie.`
}

module.exports = handleError