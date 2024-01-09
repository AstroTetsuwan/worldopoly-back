const { database } = require('../../firebaseApp');

const create = (node, data) => {
    return database.ref(node).set({
        ...data,
        created_at: Date.now()
    });
}

const read = (node) => {
    return database.ref(node).once('value');
}

const update = (node, data) => {
    return database.ref(node).update({
        ...data,
        updated_at: Date.now()
    });
}

const remove = (node) => {
    return database.ref(node).remove();
}

module.exports = {
    create,
    read,
    update,
    remove
}