const {requestWithToken} = require('../../infra/axios')

exports.createTypeColumn = async function(data, token){
    const response = await requestWithToken('typeColumns','post', data, token); 
    return response.data;
}