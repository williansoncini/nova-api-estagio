const pgp = require('pg-promise')();

const db = pgp({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:'123',
    database:'ESTAGIO'
})

module.exports = db;
