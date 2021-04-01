const update = ({ values, callback, endPoint }) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    return fetch(`/${endPoint}/update/` + values.id, requestOptions)
        .then(response => response.json())
        .then(data => callback && callback(data));
}

const create = ({ values, callback, endPoint }) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    return fetch(`/${endPoint}/create`, requestOptions)
        .then(response => response.json())
        .then(data => callback && callback(data));
}

const post = ({ values, callback, endPoint }) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    return fetch(`/${endPoint}`, requestOptions)
        .then(response => response.json())
        .then(data => callback && callback(data));
}

const download = ({ values, callback, endPoint, filename }) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    return fetch(`/${endPoint}`, requestOptions)
        .then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();  //afterwards we remove the element again         
        })
        .catch(error => console.error(error.message));
}

const deleteEntry = ({ id, callback, endPoint }) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`/${endPoint}/delete/` + id, requestOptions)
        .then(response => response.json())
        .then(data => callback && callback(data));
}

const updateTenant = (values, callback) => {
    return update({ values, callback, endPoint: 'tenant' });
}

const createTenant = (values, callback) => {
    return post({ values, callback, endPoint: 'tenant/create' });
}

const deleteTenant = (id, callback) => {
    return deleteEntry({ id, callback, endPoint: 'tenant' });
}

const updateProperty = (values, callback) => {
    return update({ values, callback, endPoint: 'property' });
}

const createProperty = (values, callback) => {
    return post({ values, callback, endPoint: 'property/create' });
}

const deleteProperty = (id, callback) => {
    return deleteEntry({ id, callback, endPoint: 'property' });
}

const updateManager = (values, callback) => {
    return update({ values, callback, endPoint: 'manager' });
}

const createManager = (values, callback) => {
    return post({ values, callback, endPoint: 'manager/create' });
}

const deleteManager = (id, callback) => {
    return deleteEntry({ id, callback, endPoint: 'manager' });
}

const updateContract = (values, callback) => {
    return update({ values, callback, endPoint: 'contract' });
}

const createContract = (values, callback) => {
    return post({ values, callback, endPoint: 'contract/create' });
}

const deleteContract = (id, callback) => {
    return deleteEntry({ id, callback, endPoint: 'contract' });
}

const updateTemplate = (values, callback) => {
    return update({ values, callback, endPoint: 'template' });
}

const createTemplate = (values, callback) => {
    return post({ values, callback, endPoint: 'template/create' });
}

const deleteTemplate = (id, callback) => {
    return deleteEntry({ id, callback, endPoint: 'template' });
}

const downloadDoc = ({ filename, values, callback }) => {
    return download({ values, callback, endPoint: 'contract/docx', filename });
}

export {
    updateTenant,
    createTenant,
    deleteTenant,

    updateProperty,
    createProperty,
    deleteProperty,

    updateManager,
    createManager,
    deleteManager,

    updateContract,
    createContract,
    deleteContract,

    updateTemplate,
    createTemplate,
    deleteTemplate,

    downloadDoc
}