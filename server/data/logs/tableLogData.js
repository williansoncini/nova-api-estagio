const database = require('../../infra/database/database_system')

exports.saveLogTable = function (data){
    return database.query('insert into log_operacao_tabela(operacao,tabela,usuario) values ($1,$2,$3);',[data.operacao, data.tabela, data.usuario])
}