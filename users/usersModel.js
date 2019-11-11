const db = require('../data/dbConfig')

function createUser(user) {
    db('users')
    .insert(user)
}

function get(id) {
    let query = db('users as u')

    if (id) query.where('u.userId', id)

    return query;
}

module.exports = {
    get,
    createUser
}