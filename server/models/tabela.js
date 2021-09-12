class Tabela{
    constructor(id,nome, ativa, categoria_id){
        this.id = id;
        this.nome = nome;
        this.ativa = ativa;
        this.categoria_id = categoria_id;
    }
}

module.exports = new Tabela()