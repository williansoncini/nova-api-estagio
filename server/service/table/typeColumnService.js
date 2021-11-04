const typeColumnData = require('../../data/table/typeColumnData');

exports.gettypeColumns = async function (){
    try {
        const typeColumns = await typeColumnData.gettypeColumns();
        if (typeColumns == null)
            return {'status':404, 'error':'Tipos de colunas não encontrados!'}
        return {'status':200, 'success':'Tipos de colunas consultados!', 'data':typeColumns}
    } catch (error) {
        return {'status':400, 'error':'Erro ao consultar tipos de colunas'}
    }
};

exports.savetypeColumn = async function(typeColumn){
    return typeColumnData.savetypeColumn(typeColumn);
};

exports.deletetypeColumn = function(id){
    return typeColumnData.deletetypeColumn(id);
};

exports.gettypeColumn = function(id){
    return typeColumnData.gettypeColumn(id);
}

exports.updatetypeColumn = async function(id, typeColumn){
    return typeColumnData.updatetypeColumn(id, typeColumn)
}
