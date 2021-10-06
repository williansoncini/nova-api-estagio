const database = require('../infra/database_datas')

exports.createTable = async function(tabela){
    const table = tabela.table
    const columns = tabela.columns

    const columnsLength = columns.length

    statement = `CREATE TABLE ${table.nome} (`
    for(var index in columns){
        if (index == columnsLength-1)
            statement += `${columns[index].nome}`
        else
            statement += `${columns[index].nome},`
    }

    statement += ');'

    return statement
}