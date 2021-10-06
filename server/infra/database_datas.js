const pgp = require('pg-promise')();

const db = pgp({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:'123',
    database:'db_data_excel'
})

module.exports = db;