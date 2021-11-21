const departamentData = require('../../data/user/departamentData');

exports.getdepartaments = async function () {
    try {
        const departaments = await departamentData.getdepartaments();
        return { 'status': 200, 'success': 'Departamentos consultados com sucesso!', 'data': departaments }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Erro as consultar departamentos!' }
    }
};

exports.savedepartament = async function (departament) {
    try {
        if (departament.descricao == null || departament.descricao == '')
            return { 'status': 400, 'error': 'Informe um valor para a descrição!' }

        departament.descricao = departament.descricao.trim()

        const existentdepartament = await departamentData.getdepartamentByDescription(departament.descricao)
        if (existentdepartament != null)
            return { 'status': 400, 'error': 'Departamento já cadastrado!' }

        const saveddepartament = await departamentData.savedepartament(departament);
        if (saveddepartament != null)
            return { 'status': 200, 'success': 'Departamento salvo com sucesso!', 'data': saveddepartament }
        else
            return { 'status': 400, 'error': 'Falha ao cadastrar departamento!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao cadastrar departamento!' }
    }
};

exports.deletedepartament = async function (id) {
    try {
        const departament = await departamentData.getdepartament(id);
        if (departament == null)
            return { 'status': 400, 'error': 'Departamento não encontrado!' }
        await departamentData.deletedepartament(id);
        return {'status':200, 'success':'Departamento deletado com sucesso!'}
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Esse departamento está atrelado a usuários, por isso não é possível deleta-lo!' }
    }
};

const getdepartament = async function (id) {
    try {
        const departament = await departamentData.getdepartament(id);
        if (departament == null)
            return { 'status': 400, 'error': 'Departamento não encontrado!' }
        return { 'status': 200, 'success': 'Departamento encontrado!', 'data': departament }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao consultar departamento!' }
    }
}

exports.getdepartament = getdepartament

exports.updatedepartament = async function (id, departament) {
    try {
        if (departament.descricao == null || departament.descricao == '')
            return { 'status': 400, 'error': 'Informe um valor para a descrição!' }
        if (departament.ativo == null || departament.ativo == '')
            return { 'status': 400, 'error': "Informe um valor para o campo 'status'!" }

        departament.descricao = departament.descricao.trim()

        const responseGetdepartamentById = await getdepartament(id)
        if (responseGetdepartamentById.status == 400)
            return { 'status': responseGetdepartamentById.status, 'error': responseGetdepartamentById.error }

        const existentdepartament = responseGetdepartamentById.data
        if (existentdepartament.descricao == departament.descricao && existentdepartament.ativo == departament.ativo)
            return { 'status': 200, 'success': 'Nada a ser mudado!' }

        if (existentdepartament.descricao != departament.descricao) {
            const existentdepartamentByName = await departamentData.getdepartamentByDescription(departament.descricao)
            if (existentdepartamentByName != null)
                return { 'status': 400, 'error': 'Departamento já cadastrado!' }
        }
        await departamentData.updatedepartament(id, departament)
        return { 'status': 200, 'success': 'Departamento alterado com sucesso!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'erorr': 'Falha ao alterar a departamento!' }
    }
}