const departamentData = require('../data/departamentData');
const bcrypt = require('bcrypt');


exports.getdepartaments = function (){
    return departamentData.getdepartaments();
};

exports.savedepartament = async function(departament){
    // console.log(await bcrypt.hash(departament.senha, 10));
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
