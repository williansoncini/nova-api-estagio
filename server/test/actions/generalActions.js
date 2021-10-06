const {requestBasicLogin,requestWithToken,request} = require('../../infra/axios')

exports.createUser = async function(data){
    const saveUser = await request('users','post', data); 
    return saveUser.data;
}

exports.makeLoginAndReturnToken = async function(data){
    let responseLogin = await requestBasicLogin('login',data);
    responseLoginData = responseLogin.data;
    return responseLoginData.token
}

exports.createAny = async function(url, data, token){
    const response = await requestWithToken(url,'post',data,token); 
    return response.data;
}

exports.getAllAny = async function(url,token){
    const response = await requestWithToken(url,'get',{},token); 
    return response.data;
}

exports.getAnyById = async function(url,id,token){
    const response = await requestWithToken(`${url}/${id}`,'get', {}, token); 
    return response.data;
}

exports.updateAny = async function(url,data,id,token){
    const response = await requestWithToken(`${url}/${id}`,'put', data, token); 
    return response.data;
}

exports.deleteAny = async function(url, id, token){
    const response = await requestWithToken(`${url}/${id}`,'delete',{},token)
    return response.data
}

