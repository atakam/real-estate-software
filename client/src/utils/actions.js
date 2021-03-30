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
    return create({ values, callback, endPoint: 'tenant' });
}

const deleteTenant = (id, callback) => {
    return deleteEntry({ id, callback, endPoint: 'tenant' });
}

const updateProperty = (values, callback) => {
    return update({ values, callback, endPoint: 'property' });
}

const createProperty = (values, callback) => {
    return create({ values, callback, endPoint: 'property' });
}

const deleteProperty = (id, callback) => {
    return deleteEntry({ id, callback, endPoint: 'property' });
}

const updateManager = (values, callback) => {
    return update({ values, callback, endPoint: 'manager' });
}

const createManager = (values, callback) => {
    return create({ values, callback, endPoint: 'manager' });
}

const deleteManager = (id, callback) => {
    return deleteEntry({ id, callback, endPoint: 'manager' });
}

const updateContract = (values, callback) => {
    return update({ values, callback, endPoint: 'contract' });
}

const createContract = (values, callback) => {
    return create({ values, callback, endPoint: 'contract' });
}

const deleteContract = (id, callback) => {
    return deleteEntry({ id, callback, endPoint: 'contract' });
}

const updateTemplate = (values, callback) => {
    return update({ values, callback, endPoint: 'template' });
}

const createTemplate = (values, callback) => {
    return create({ values, callback, endPoint: 'template' });
}

const deleteTemplate = (id, callback) => {
    return deleteEntry({ id, callback, endPoint: 'template' });
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
    deleteTemplate
}