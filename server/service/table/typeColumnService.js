const typeColumnData = require('../../data/table/typeColumnData');

exports.gettypeColumns = function (){
    return typeColumnData.gettypeColumns();
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
