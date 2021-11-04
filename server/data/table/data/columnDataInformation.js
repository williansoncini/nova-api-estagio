const databaseInformation = require('../../../infra/database/database_information')

exports.createColumn = function (tableName, data){
    return databaseInformation.query(`ALTER TABLE ${tableName} ADD COLUMN ${data.nome} ${data.tipo_coluna_valor} ${data.vazio};`)
}

exports.alterColumnName = function(tableName, oldName, newName){
    return databaseInformation.query(`ALTER TABLE ${tableName} RENAME COLUMN ${oldName} TO ${newName}`)
}

exports.alterTypeColumn = function(tableName, columnName, newType){
    return databaseInformation.query(`ALTER TABLE ${tableName} ALTER COLUMN ${columnName} TYPE ${newType} USING ${columnName}::${newType}`)
}

exports.setNotNullColumn = function(tableName, columnName){
    return databaseInformation.query(`ALTER TABLE ${tableName} ALTER COLUMN ${columnName} set not null;`)
}

exports.removeNotNullColumn = function(tableName, columnName){
    return databaseInformation.query(`ALTER TABLE ${tableName} ALTER COLUMN ${columnName} set not null;`)
}

exports.deleteColumn = function(tableName, columnName){
    return databaseInformation.query(`ALTER TABLE ${tableName} DROP COLUMN ${columnName};`)
}