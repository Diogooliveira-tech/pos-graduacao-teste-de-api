const request = require('supertest');
const { faker } = require('@faker-js/faker');

const {
    URLS,
    HEADERS
} = require('../suporte/configEnv')


describe('Suite de testes crud (post, get, put, delete)', () => {

    const payloadUsuario = {
        nome: faker.name.fullName(),
        telefone: faker.phone.number('+55 (##) ####-####'),
        email: faker.internet.email(),
        senha: faker.internet.password()
    }

    let recebeId;

    it('CT002 - Cadastrando um usuário, e consultando o retorno dos campos, se foram enviados.', async () => {
        const response = await request(URLS.ENDPOINT_USERS)
            .post('/users')
            .set(HEADERS.CONTENT_TYPE)
            .send(payloadUsuario);

        recebeId = response.body.id;
        expect(response.status).toBe(201);
        expect(recebeId).toBeDefined();
        console.log('Usuário cadastrado: ', response.body);
    })

    it('CT003 - Alterando o registro cadastrado anteriormente, e verificando se os dados realmente foram alterados.', async () => {

        const novoUsuario = {
            nome: faker.name.fullName(),
            telefone: faker.phone.number('+55 (##) ####-####'),
            email: faker.internet.email(),
            senha: faker.internet.password()
        }

        const responsePut = await request(URLS.ENDPOINT_USERS)
            .put(`/users/${recebeId}`)
            .send(novoUsuario)

        expect(responsePut.status).toBe(201);
        expect(responsePut.body.nome).toBe(novoUsuario.nome);
        expect(responsePut.body.telefone).toBe(novoUsuario.telefone);
        console.log('Usuário alterado: ', responsePut.body);


        const responseGet = await request(URLS.ENDPOINT_USERS)
            .get(`/users/${recebeId}`)

        expect(responseGet.status).toBe(200);
        expect(responseGet.body.id).toBe(recebeId);
        expect(responseGet.body.nome).toBe(novoUsuario.nome);
        expect(responseGet.body.telefone).toBe(novoUsuario.telefone);
        console.log('Usuário alterado resultado da consulta: ', responseGet.body);

    })

    it('CT004 - Deverá remover o registro cadastrado anteriormente. E retornar 204.', async () => {
        const response = await request(URLS.ENDPOINT_USERS)
            .delete(`/users/${recebeId}`)

        expect(response.status).toBe(204)
        console.log('Resposta do delete:', response.body)


        const responseGet = await request(URLS.ENDPOINT_USERS)
            .get(`/users/${recebeId}`)

        expect(responseGet.status).toBe(404);
        expect(responseGet.body).toEqual({ error: 'Usuário não encontrado' });
        console.log(responseGet.body);

    })

});

//parei 1:42