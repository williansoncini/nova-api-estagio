const database = require('../infra/database');
const crypto = require('crypto');
const axios = require('axios');

const generateData = function(){
    return {
        nome: crypto.randomBytes(20).toString('hex'),
        vazio:'1',
        id_tipocoluna: 1,
        id_tabela:2
    }
}

const request = function(url, method, data){
    return axios.request({
        url,
        method,
        data
    });
}

teste('Criar coluna', async function(){
    const data = generateData();
    const column = await request('http://localhost:3000/columns','post',data);
    console.log('')

})