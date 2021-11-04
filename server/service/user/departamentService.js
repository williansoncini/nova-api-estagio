const departamentData = require('../../data/user/departamentData');
const bcrypt = require('bcrypt');


exports.getdepartaments = function (){
    return departamentData.getdepartaments();
};

exports.savedepartament = async function(departament){
    return departamentData.savedepartament(departament);
};

exports.deletedepartament = function(id){
    return departamentData.deletedepartament(id);
};

exports.getdepartament = function(id){
    return departamentData.getdepartament(id);
}

exports.updatedepartament = async function(id, departament){
    return departamentData.updatedepartament(id, departament)
}
