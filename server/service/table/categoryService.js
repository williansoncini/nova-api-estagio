const categoryData = require('../../data/table/categoryData');

exports.getcategorys = function (){
    return categoryData.getcategorys();
};

exports.savecategory = async function(category){
    return categoryData.savecategory(category);
};

exports.deletecategory = function(id){
    return categoryData.deletecategory(id);
};

exports.getcategory = function(id){
    return categoryData.getcategory(id);
}

exports.updatecategory = async function(id, category){
    return categoryData.updatecategory(id, category)
}
