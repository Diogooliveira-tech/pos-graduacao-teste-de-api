const request = require('supertest');
const funcoesGenericas = require('../suporte/funcoes_genericas')

const rota = "http://localhost:3000";

describe('Suite de teste da api users...', () => {

    const json_arquivo_cadastro_usuario = {
        nome: "Diogo do Teste",
        telefone: "(11) 12345-6789",
        email: "souDeQa@3@usuario1.com", // nossa chave unica
        senha: "1232"
    }

    const json_arquivo_cadastro_usuario_dados_ausentes = {
        nome: "",
        telefone: "",
        email: "heloisa@vaitester422.com.br",
        senha: ""
    }

    const json_teste_sem_conteudo = {
        "nome": "",
        "telefone": "",
        "email": "",
        "senha": ""
    }

    it('Deve cadastrar um novo usuario, e retornar 201.', async () => {
        // construindo a requisição, e passando a rota completa
        const response = await request(rota)
            .post('/users')
            // precisamos informar os dados que serão enviados no body.
            // no primeiro momento, não estamos usando uma biblioteca para gerar massa de teste. Por isso, o (json_arquivo_cadastro_usuario) pode exibir erro.
            .send(json_arquivo_cadastro_usuario)
        // teste do retorno de status 201
        expect(response.status).toBe(201);
        console.log(response.body);
    });

    it('Deve cadastrar um usuário com dados válidos, e retornar um objeto do usuário criado e um status 201.', async () => {
        const response = await request(rota)
            .post('/users')
            // no primeiro momento, não estamos usando uma biblioteca para gerar massa de teste. Por isso, o (json_arquivo_cadastro_usuario) pode exibir erro.
            .send(json_arquivo_cadastro_usuario)
        expect(response.status).toBe(201);
        console.log(response.body);
    });

    it('Deve Cadastrar usuário com Dados Ausentes, e lançar um Erro e retornar um status 422 apresentando uma mensagem descritiva e detalhada do erro', async () => {
        const response = await request(rota)
            .post('/users')
            .send(json_arquivo_cadastro_usuario_dados_ausentes)
        expect(response.status).toBe(422)
        console.log(response.body);
    });

    it('Tentativa de Cadastro sem conteúdo, deve retornar status 422 e apresentando uma mensagem descritiva e detalhada com o erro "Os seguintes campos são obrigatórios: nome, telefone, email, senha".', async () => {
        const response = await request(rota)
            .post('/users')
            .send(json_teste_sem_conteudo)
        expect(response.status).toBe(422);
        console.log(response.body);
    });

});


/*
    const json_teste_POSTusersComOcampoEmailComoBooleano = {
        "nome": "Usuario Teste",
        "telefone": "1234567890",
        "email": "usuario@example.com",
        "senha": false
    }

    const json_teste_POSTusersComoCampoEmailComoArray = {
        "nome": "Usuario Teste",
        "telefone": "1234567890",
        "email": ["usuario@example.com", "usuario@work.com"],
        "senha": "senha123"
    }

    const json_teste_POSTusersComoCampoSenhaComoArray = {
        "nome": "Usuario Teste",
        "telefone": "1234567890",
        "email": ["usuario@example.com", "usuario@work.com"],
        "senha": "senha123"
    }

    const json_teste_POSTusersComOCampoSenhaComoBooleano = {
        "nome": "Usuario Teste",
        "telefone": "1234567890",
        "email": "usuario@example.com",
        "senha": false
    }

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
            .send(json_teste_sem_conteudo)
        expect(response.status).toBe(422);
        //expect(response.body).toEqual(json_teste_sem_conteudo);
        console.log(response.body);
    });
 
    it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
        const response = await request(rota)
            .post('/users')
            .send(json_teste_POSTusersComOcampoSenhaComoBooleano)
        expect(response.status).toBe(422);
       // expect(response.body).toEqual(json_teste_POSTusersComOcampoSenhaComoBooleano);
        console.log(response.body);
    });
 
    it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
        const response = await request(rota)
            .post('/users')
            .send(json_teste_POSTusersComoCampoEmailComoArray)
        expect(response.status).toBe(422);
        //expect(response.body).toEqual(json_teste_POSTusersComoCampoEmailComoArray);
        console.log(response.body);
    });
 
    it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
        const response = await request(rota)
            .post('/users')
            .send(json_teste_POSTusersComOCampoSenhaComoBooleano)
        expect(response.status).toBe(422);
        //expect(response.body).toEqual(json_teste_POSTusersComOCampoSenhaComoBooleano);
        console.log(response.body);
    });
*/

