const request = require('supertest'); //fazendo um require do superte
const rotaUsers = 'http://localhost:3000'; //passando minha rota, ela pode e deve estar em outro lugar isolada
const { faker } = require('@faker-js/faker'); //importando a biblioteca do faker

describe('Suite de testes crud (post, get, put, delete)', () => {

    const payloadUsuario = {
        nome: faker.name.fullName(),
        telefone: faker.phone.number('+55 (##) ####-####'),
        email: faker.internet.email(),
        senha: faker.internet.password()
    }

    const payloadUsuarioEmailFieldNull = {
        nome: faker.name.fullName(),
        telefone: faker.phone.number('+55 (##) ####-####'),
        email: null,
        senha: faker.internet.password()
    }

    let recebeId;

    it('CT001 - Ausencia de campo email, deverá gerar o status code 422 e emitir uma mensagem de erro validando a mesma', async () => {
        const response = await request(rotaUsers)
            .post('/users')
            .send(payloadUsuarioEmailFieldNull);

        //validação do status code
        expect(response.status).toBe(422);

        //validar a mensagem: "Os seguintes campos são obrigat´rios: email"
        //expect(response.body).toEqual('Mensagem Qualquer') //Não posso passar assim pq vai dar erro
        expect(response.body).toEqual({ error: 'Os seguintes campos são obrigatórios: email' }); //forma correta
        console.log(response.body);
    })

    it('CT002 - Cadastrando um usuário, e consultando o retorno dos campos, se foram enviados.', async () => {
        const response = await request(rotaUsers)
            .post('/users')
            .send(payloadUsuario);

        //armazenar o retorno do ID, na variável
        recebeId = response.body.id;

        //validação do status code
        expect(response.status).toBe(201);

        //verificar se o id realmente está definido (retornado)
        expect(recebeId).toBeDefined();

        console.log('Usuário cadastrado: ', response.body);
    })

    it('CT003 - Alterando o registro cadastrado anteriormente, e verificando se os dados realmente foram alterados.', async () => {
        //armazenar a variavel
        // receber a variavel no parametro da url do put
        // laterar todos os registros do payload
        //validar status code
        //validar alteração
        //logar resposta
    })

    it('CT004 - Deverá remover o registro cadastrado anteriormente. E retornar 204.', async () => {
        const response = await request(rotaUsers)
            .delete(`/users/${recebeId}`)

        //valida o statusCode    
        expect(response.status).toBe(204)
        console.log('Resposta do delete:', response.body)

        //validar se realmente foi removido o registro
        const responseGet = await request(rotaUsers)
            .get(`/users/${recebeId}`)

        expect(responseGet.status).toBe(404); //valida o status
        //expect(responseGet.status).toBe(500); //valida o status, teve mudança no código e não retorna mais o 500.
        //expect(responseGet.body).toEqual({ error: 'Erro ao obter dados do ' }); //dando erro pq não retorna status 500.
        expect(responseGet.body).toEqual({ error: 'Usuário não encontrado' });
        console.log(responseGet.body);
    })
    
});


/*
it('Cadastrando um usuário, e consultando o retorno dos campos, se foram enviados.', async () => {
    const response = await request(rotaUsers)
        .post('/users')
        .send(payloadUsuario);

    //validação do status code
    expect(response.status).toBe(201);

    //validar dados retornados
    const {id, nome, telefone, email} = response.body

    //verifica presença do ID
    expect(id).toBeDefined();

    //verifica valor enviado x persistido (recebido)
    expect(nome).toBe(payloadUsuario.nome)
    expect(telefone).toBe(payloadUsuario.telefone)
    expect(email).toBe(payloadUsuario.email)

    //verificar que a senha não está presente no retorno
    expect(response.body.senha).toBeUndefined();

    console.log('Cadastro do usuário randomico: ', response.body);

})

*/





// Como começar o meu teste, o modelo de escrita sempre é o describe, logo é dessa forma que ele é feito:
/*
describe('Descrição da minha suite de teste', () =>{
    it('Descição do meu Teste. Posso ter um it ou N its na minha suite de testes', async() =>{

    })
});
*/

// no Vs code tem extenções para criar os meus describe e its