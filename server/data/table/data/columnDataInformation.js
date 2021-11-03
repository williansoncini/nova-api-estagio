const databaseInformation = require('../../../infra/database/database_information')

exports.alterColumnName = function(tableName, oldName, newName){
    return databaseInformation.query(`ALTER TABLE ${tableName} RENAME COLUMN ${oldName} TO ${newName}`)
}

exports.alterTypeColumn = function(tableName, columnName, newType){
    return databaseInformation.query(`ALTER TABLE ${tableName} ALTER COLUMN ${columnName} TYPE ${newType} USING ${columnName}::${newType}`)
}
