const updateTenant = (values, callback) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    fetch('/tenant/update/' + values.id, requestOptions)
        .then(response => response.json())
        .then(data => callback && callback(data));
}

const createTenant = (values, callback) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    fetch('/tenant/create', requestOptions)
        .then(response => response.json())
        .then(data => callback && callback(data));
}

const deleteTenant = (id, callback) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('/tenant/delete/' + id, requestOptions)
        .then(response => response.json())
        .then(data => callback && callback(data));
}

export {
    updateTenant,
    createTenant,
    deleteTenant
}