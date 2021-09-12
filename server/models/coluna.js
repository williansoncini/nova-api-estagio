class Coluna{
    constructor(id,nome, vazio, id_tipocoluna,id_tabela){
        this.id = id;
        this.nome = nome;
        this.vazio = vazio;
        this.id_tipocoluna = id_tipocoluna;
        this.id_tabela = id_tabela;
    }
}

module.exports = new Coluna()