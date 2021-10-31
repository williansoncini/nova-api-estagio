const databaseInformation = require('../infra/database/database_information')
const copyFrom = require('pg-copy-streams').from
const fs = require('fs')

exports.importCsvIntoTable = function(csvFilePath, tableName){
    databaseInformation.connect(function(err, client, done){
        var stream = client.query(copyFrom(`COPY ${tableName} FROM STDIN`))
        var fileStream = fs.createReadStream(csvFilePath)
        fileStream.on('error', done)
        stream.on('error', done)
        stream.on('finish', done)
        fileStream.pipe(stream)
    });

    // TENTATIVA 3
    // databaseInformation.connect()
    // var stream = databaseInformation.query(copyFrom(`COPY ${tableName} FROM STDIN DELIMITER ';'`))
    // stream.write("TESTE;TESTE;1.1")
    // stream.end()
    // databaseInformation.query(`COPY ${tableName} from ${csvFilePath} stdin delimiter ';' csv header`)


    //TENTATIVA 4
    
    return databaseInformation.query(`select * from ${tableName}`)
}