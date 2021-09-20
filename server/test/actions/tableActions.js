const {requestWithToken} = require('../../infra/axios')

exports.createTable = async function(data, token){
    const response = await requestWithToken('tables','post',data, token);
    return response.data;
}
