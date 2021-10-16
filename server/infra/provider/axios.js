const axios = require('axios');
const crypto = require('crypto');

let mainUrl = 'http://localhost:3000/'

exports.request = function(url, method, data){
    const newUrl = mainUrl.concat(url)
    return axios({url:newUrl,method, data});
}

exports.requestBasicLogin = function(url, user){
    return axios.post((mainUrl + url),{},{
        auth:{
            username:user.email,
            password:user.senha
        }
    })
}

exports.requestWithToken =  function(url, method, data, token){
    const newUrl = mainUrl.concat(url)
    return axios({
        url:newUrl,
        method,
        data,
        headers:{
                Authorization: `Bearer ${token}`
            }
    });
}
