const databaseInformation = require('../infra/database/database_information')
const copyFrom = require('pg-copy-streams').from
const fs = require('fs')

exports.importCsvIntoTable = function(csvFilePath, tableName){
    // TENTATIVA 1
    // console.log("COPY $1 from $2 delimiter ';' csv header;",[tableName, 
        // 'C:\Users\Computador\OneDrive\Faculdade\OITAVO SEMESTRE\Estágio\aplicação\nova-api-estagio\server\csvFiles\teste.csv'])
    // console.log("COPY $1 from $2 delimiter ';' csv header;",[tableName, csvFilePath])
    // return database.query("COPY $1 from $2 delimiter ';' csv header;",[tableName, csvFilePath])
    // return database.query("COPY tabela1 from 'C://Users//Computador//OneDrive//Faculdade//OITAVO SEMESTRE//Estágio//aplicação//nova-api-estagio//server//csvFiles//teste.csv' delimiter ';' csv header;")
   
    // TENTATIVA 2 
    // var fileStream = fs.createReadStream(csvFilePath)
    // console.log(csvFilePath)
    // console.log(tableName)
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