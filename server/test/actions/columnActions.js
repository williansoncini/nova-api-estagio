const {requestWithToken} = require('../../infra/axios')

exports.createColumn = async function(data, token){
    const response = await requestWithToken('columns','post', data, token); 
    return response.data;
}