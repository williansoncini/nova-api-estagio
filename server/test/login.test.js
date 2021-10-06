const { generateDataUser } = require('./datas')
const {makeLoginAndReturnToken,createUser,deleteAny}  = require('./actions/generalActions');

test('Nao foi possivel logar', async function (){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)
    expect(token).not.toBe(null)

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
})
