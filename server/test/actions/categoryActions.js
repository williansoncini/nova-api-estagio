const {requestBasicLogin,requestWithToken,request} = require('../../infra/axios')

exports.createCategory = async function(data, token){
    const saveCategory = await requestWithToken('categorys','post', data, token); 
    return saveCategory.data;
}