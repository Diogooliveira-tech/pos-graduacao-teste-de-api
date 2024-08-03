describe('', () => {

    it('Teste 01: Cadastrando usuário, e validando dados enviados e satusCode 201', async() => {
        //1. Você deverá cadastrar um novo conteúdo e verificar que o conteúdo está devidamente retornando os dados esperados e o statusCode de sucesso esperado.
    
        beforeAll(async () => {

            const payloadUsuario = {
                nome: faker.person.fullName(),
                telefone: faker.phone.number('+55 (##) ####-####'),
                email: faker.internet.email(),
                senha: faker.internet.password()
            }
    
            const response = await request(URLS.ROTA_ENDPOINT)
                .post('/users')
                .set(HEADERS.CONTENT_TYPE)
                .send(payloadUsuario);
    
            recebeId = response.body.id;
            expect(response.status).toBe(201);
            expect(recebeId).toBeDefined();
    
            console.log('Usuário cadastrado: ', response.body);
    
        })
    
    
    })

    it('Teste 02: Deve consultar o registro cadastrado anteriormente, e validar resultado e statusCode', async()=> {
        //2. Você deverá realizar a consulta desse conteúdo em que acabou de cadastrar, e verificar se realmente está sendo retornado o conteúdo desejado com os dados desejados.
    })

    it('Teste 03: Deve alterar o conteudo cadastrado anteriormente, e validar que os dados realmente foram alterados e validar statusCode', async() => {
        //3. Você deverá alterar o conteúdo consultado anteriormente, e em seguida validar se realmente os dados foram alterados.
    })

    it('Teste 04: Deve remover o registro cadastrado, e validar a consulta do resgistro para garantir sua remoção', async() => {
        //4. Por fim, você deverá remover o conteúdo e garantir que o mesmo foi removido e não existe mais para consulta.
    })

    it('exemplo da nova rota', async() => {
        
        const payloadConteudos ={
            
            titulo: "string",
            descricao: "string",
            tipoConteudo: "string",
            conteudo: "string",
            //usar o faker
        }
        
        const responseGet = await request(URLS.ROTA_ENDPOINT)
        .get(`/conteudos`)
        expect(responseGet.status).toBe(200); //validar

        // se POST
     /* const responseGet = await request(URLS.ROTA_ENDPOINT)
        .post(`/conteudos`)
        .send(payloadConteudos)
        expect(responseGet.status).toBe(200); //validar
        expect(responseGet.body.titulo).toBe(payloadConteudos.titulo) //valida os retornos
        isso vale para (titulo, descricao,tipoConteudo e conteudo )
     */  
    })



})


//Exemplo

const request = require('supertest');
const { faker } = require('@faker-js/faker');

const {
    URLS,
    HEADERS
} = require('../../suporte/configEnv')

let recebeId;

describe('Suite de testes crud (post, get, put, delete USER)', () => {

    beforeAll(async () => {

        const payloadUsuario = {
            nome: faker.person.fullName(),
            telefone: faker.phone.number('+55 (##) ####-####'),
            email: faker.internet.email(),
            senha: faker.internet.password()
        }

        const response = await request(URLS.ROTA_ENDPOINT)
            .post('/users')
            .set(HEADERS.CONTENT_TYPE)
            .send(payloadUsuario);

        recebeId = response.body.id;
        expect(response.status).toBe(201);
        expect(recebeId).toBeDefined();

        console.log('Usuário cadastrado: ', response.body);

    })

    it('CT001 - Alterando o registro cadastrado anteriormente, e verificando se os dados realmente foram alterados.', async () => {

        const novoUsuario = {
            nome: faker.person.fullName(),
            telefone: faker.phone.number('+55 (##) ####-####'),
            email: faker.internet.email(),
            senha: faker.internet.password()
        }

        const responsePut = await request(URLS.ROTA_ENDPOINT)
            .put(`/users/${recebeId}`)
            .send(novoUsuario)

        expect(responsePut.status).toBe(201);
        expect(responsePut.body.nome).toBe(novoUsuario.nome);
        expect(responsePut.body.telefone).toBe(novoUsuario.telefone);
        console.log('Usuário alterado: ', responsePut.body);


        const responseGet = await request(URLS.ROTA_ENDPOINT)
            .get(`/users/${recebeId}`)

        expect(responseGet.status).toBe(200);
        expect(responseGet.body.id).toBe(recebeId);
        expect(responseGet.body.nome).toBe(novoUsuario.nome);
        expect(responseGet.body.telefone).toBe(novoUsuario.telefone);
        console.log('Usuário alterado resultado da consulta: ', responseGet.body);

    })

    it('CT002 - Deverá remover o registro cadastrado anteriormente. E retornar 204.', async () => {
        const response = await request(URLS.ROTA_ENDPOINT)
            .delete(`/users/${recebeId}`)

        expect(response.status).toBe(204)
        console.log('Resposta do delete:', response.body)


        const responseGet = await request(URLS.ROTA_ENDPOINT)
            .get(`/users/${recebeId}`)

        expect(responseGet.status).toBe(404);
        expect(responseGet.body).toEqual({ error: 'Usuário não encontrado' });
        console.log(responseGet.body);

    })

});