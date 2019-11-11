const db = require('../data/dbConfig')

function createUser(user) {
    return db('users')
    .insert(user)
    .then(([id]) => this.get(id))
}

function get(id) {
    let query = db('users as u')

    if (id) query.where('u.userId', id).first()

    return query;
}

function findBy(filter) {
    return db('users').where(filter)
}

module.exports = {
    get,
    createUser,
    findBy
}