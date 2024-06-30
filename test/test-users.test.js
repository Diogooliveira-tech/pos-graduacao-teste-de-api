const request = require('supertest');

const rota = "http://localhost:3000";

describe('Suite de teste da api users...', () => {

    const json_arquivo_cadastro_usuario = {
        nome: "Henrique Teste",
        telefone: "(11) 12345-6789",
        email: "Heloisa@3@usuario.com", // nossa chave unica
        senha: "1232"
    }

    const json_arquivo_cadastro_usuario_dados_ausentes = {
        "nome": "",
        "telefone": "",
        "email": "heloisa@vaitester422.com.br",
        "senha": ""
    }

    const teste_sem_conteudo = {
        "nome": "",
        "telefone": "",
        "email": "",
        "senha": ""
    }

    const teste_POSTusersComOcampoSenhaComoBooleano = {
        "nome": "Usuario Teste",
        "telefone": "1234567890",
        "email": "usuario@example.com",
        "senha": false
    }

    const teste_POSTusersComoCampoEmailComoArray = {
        "nome": "Usuario Teste",
        "telefone": "1234567890",
        "email": ["usuario@example.com", "usuario@work.com"],
        "senha": "senha123"
    }

    const teste_POSTusersComOCampoSenhaComoBooleano = {
        "nome": "Usuario Teste",
        "telefone": "1234567890",
        "email": "usuario@example.com",
        "senha": false

    }


    it('Deve cadastrar um novo usuario, e retornar 200.', async () => {
        // construimos a nossa requisição, passando a rota completa
        const response = await request(rota)
            .post('/users')
            // precisamos construir os dados que serão enviados no body
            .send(json_arquivo_cadastro_usuario)
        // teste do retorno de status 200
        expect(response.status).toBe(201);
        console.log(response.body);
    });

    it.only('Deve cadastrar um novo usuario, e retornar 422.', async () => {
        // construimos a nossa requisição, passando a rota completa
        const response = await request(rota)
            .post('/users')
            .send(json_arquivo_cadastro_usuario_dados_ausentes)
        expect(response.status).toBe(422);
        console.log(response.body);
    });


/*

    it('Consulta todos os usuários...deve retornar status 200.', async () => {
        const response = await request(rota).get('/users');
        expect(response.status).toBe(200);
        //expect(response.status).toBe(201); // vai dar erro
    });

    it('Deve cadastrar um novo usuario, e retornar 200.', async () => {
        // construimos a nossa requisição, passando a rota completa
        const response = await request(rota)
            .post('/users')
            // precisamos construir os dados que serão enviados no body
            .send(json_arquivo_cadastro_usuario)
        // teste do retorno de status 200
        expect(response.status).toBe(201);
        console.log(response.body);
    });

    it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
        const response = await request(rota)
            .post('/users')
            .send(json_arquivo_cadastro_usuario)
        expect(response.status).toBe(422);
        //expect(response.body).toEqual(json_arquivo_cadastro_usuario);
        console.log(response.body);
    });

    it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
        const response = await request(rota)
            .post('/users')
            .send(teste_sem_conteudo)
        expect(response.status).toBe(422);
        //expect(response.body).toEqual(teste_sem_conteudo);
        console.log(response.body);
    });

    it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
        const response = await request(rota)
            .post('/users')
            .send(teste_POSTusersComOcampoSenhaComoBooleano)
        expect(response.status).toBe(422);
       // expect(response.body).toEqual(teste_POSTusersComOcampoSenhaComoBooleano);
        console.log(response.body);
    });

    it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
        const response = await request(rota)
            .post('/users')
            .send(teste_POSTusersComoCampoEmailComoArray)
        expect(response.status).toBe(422);
        //expect(response.body).toEqual(teste_POSTusersComoCampoEmailComoArray);
        console.log(response.body);
    });

    it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
        const response = await request(rota)
            .post('/users')
            .send(teste_POSTusersComOCampoSenhaComoBooleano)
        expect(response.status).toBe(422);
        //expect(response.body).toEqual(teste_POSTusersComOCampoSenhaComoBooleano);
        console.log(response.body);
    });
*/
});

//expect(response.body).toEqual(json_arquivo_cadastro_usuario); // valida o que eu enviei é o que eu esperava e recebi de volta
