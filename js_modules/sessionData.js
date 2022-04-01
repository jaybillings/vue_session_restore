export function saveToSession(label, dataToSave) {
    try {
        const saveDataStr = JSON.stringify(dataToSave);
        sessionStorage.setItem(label, saveDataStr);

        return { 'success': true };
    } catch (err) {
        return {
            'success': false,
            'message': `Could not save sessionStorage item "${label}": ${err.message}`
        };
    }
}

export function loadFromSession(label) {
    if (sessionStorage.getItem(label)) {
        try {
            const pageData = JSON.parse(sessionStorage.getItem(label));

            return {
                'success': true,
                'data': pageData
            }
        } catch (err) {
            return {
                'success': false,
                'message': `Could not parse sessionStorage item "${label}": ${err.message}`
            }
        }
    }

    return {
        'success': false,
        'message': `sessionStorage does not contain item "${label}"`
    }
}

