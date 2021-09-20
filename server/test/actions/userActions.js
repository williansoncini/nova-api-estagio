const {requestBasicLogin,requestWithToken,request} = require('../../infra/axios')

exports.makeLoginAndReturnToken = async function(data){
    let responseLogin = await requestBasicLogin('login',data);
    responseLoginData = responseLogin.data;
    return responseLoginData.token
}

exports.createUser = async function(data){
    const saveUser = await request('users','post', data); 
    return saveUser.data;
}

exports.deleteUser = async function(id){
    return await requestWithToken(`users/${savedUser.id}`, 'delete',{},token)
}

