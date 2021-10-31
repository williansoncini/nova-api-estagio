const { generateDataDepartament,generateDataUser } = require('./datas')
const {makeLoginAndReturnToken,createUser,getAllAny,getAnyById,updateAny,deleteAny, createAny}  = require('./actions/generalActions');
const tableService = require('../service/tableService')
const columnService = require('../service/columnService')
const dbExcelService = require('../service/dbExcelService')

class Tabela{
    constructor(table, columns/*, typeColumns*/){
        this.table = table;
        this.columns = columns;
    }
}

test.only('criar tabela no outro banco de dados', async function(){
    table = await tableService.findTableById(1)
    columns = await columnService.getColumnByIdTable(table.id)
   
    const tabela = new Tabela(table,columns)
   
    const statement = await dbExcelService.createTable(tabela)
})