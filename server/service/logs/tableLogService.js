const tableLogData = require('../../data/logs/tableLogData')

exports.saveLogTable = async function (data){
    return await tableLogData.saveLogTable(data)
}