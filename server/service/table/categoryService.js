const categoryData = require('../../data/table/categoryData');

exports.getcategorys = async function () {
    try {
        const categorys = await categoryData.getcategorys();
        return { 'status': 200, 'success': 'Categorias consultadas com sucesso!', 'data': categorys }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Erro as consultar categorias!' }
    }
};

exports.savecategory = async function (category) {
    try {
        if (category.descricao == null || category.descricao == '')
            return { 'status': 400, 'error': 'Informe um valor para a descrição da categoria!' }

        category.descricao = category.descricao.trim()

        const existentCategory = await getCategoryByDescrciption(category.descricao)
        if (existentCategory != null)
            return { 'status': 400, 'error': 'Categoria já cadastrada!' }

        const savedCategory = await categoryData.savecategory(category);
        if (savedCategory != null)
            return { 'status': 200, 'success': 'Categoria salva com sucesso!', 'data': savedCategory }
        else
            return { 'status': 400, 'error': 'Falha ao cadastrar categoria!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao cadastrar categoria!' }
    }
};

exports.deletecategory = async function (id) {
    try {
        const category = await categoryData.getcategory(id);
        if (category == null)
            return { 'status': 400, 'error': 'Categoria não encontrada!' }
        await categoryData.deletecategory(id);
        return {'status':200, 'success':'Categoria deletada com sucesso!'}
    } catch (error) {
        return { 'status': 400, 'error': 'Essa categoria está atrelada a tabelas, por isso não é possível deleta-la!' }
    }
};

const getcategory = async function (id) {
    try {
        const category = await categoryData.getcategory(id);
        if (category == null)
            return { 'status': 400, 'error': 'Categoria não encontrada!' }
        return { 'status': 200, 'success': 'Categoria encontrada!', 'data': category }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao consultar categoria!' }
    }
}

exports.getCategory = getcategory

const getCategoryByDescrciption = function (description) {
    return categoryData.getCategoryByDescrciption(description)
}

exports.getCategoryByDescrciption = getCategoryByDescrciption

exports.updatecategory = async function (id, category) {
    try {
        if (category.descricao == null || category.descricao == '')
            return { 'status': 400, 'error': 'Informe um valor para a descrição da categoria!' }
        if (category.ativa == null || category.ativa == '')
            return { 'status': 400, 'error': "Informe um valor para o campo 'ativa'!" }

        category.descricao = category.descricao.trim()

        const responseGetCategoryById = await getcategory(id)
        if (responseGetCategoryById.status == 400)
            return { 'status': responseGetCategoryById.status, 'error': responseGetCategoryById.error }

        const existentCategory = responseGetCategoryById.data
        if (existentCategory.descricao == category.descricao && existentCategory.ativa == category.ativa)
            return { 'status': 200, 'success': 'Nada a ser mudado!' }

        if (existentCategory.descricao != category.descricao) {
            const existentCategoryByName = await getCategoryByDescrciption(category.descricao)
            if (existentCategoryByName != null)
                return { 'status': 400, 'error': 'Categoria já cadastrada!' }
        }

        await categoryData.updatecategory(id, category)
        return { 'status': 200, 'success': 'Categoria alterada com sucesso!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'erorr': 'Falha ao alterar a categoria!' }
    }
}
