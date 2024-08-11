const request = require('supertest');
const { faker } = require('@faker-js/faker');

const baseUrl = 'http://localhost:3000';


describe('Testes integrados para a rota de conteúdos', () => {

    let idConteudo;

    // beforeAll(async () => {

    //     const payloadConteudoValido = {

    //         titulo: faker.lorem.words(3), // Gera uma string com 3 palavras aleatórias
    //         descricao: faker.lorem.sentence(), // Gera uma frase aleatória
    //         tipoConteudo: faker.random.arrayElement(['artigo', 'vídeo', 'podcast', 'infográfico']), // Seleciona aleatoriamente um tipo de conteúdo de uma lista
    //         conteudo: faker.lorem.paragraphs(1) // Gera dois parágrafos de texto aleatório

    //     }

    //     const responsePost = await request(baseUrl)
    //         .post('/conteudos')
    //         .set(baseUrl)
    //         .send(payloadConteudoValido);

    //     idConteudo = responsePost.body.id;
    //     expect(responsePost.status).toBe(201);
    //     expect(idConteudo).toBeDefined();

    //     console.log('Conteúdo cadastrado: ', response.body);

    // })


    const payloadConteudoValido = {
        titulo: faker.lorem.words(24), // Gera uma string com 2 palavras aleatórias
        descricao: faker.lorem.sentence(), // Gera uma frase aleatória
        tipoConteudo: faker.helpers.arrayElement(['artigo', 'vídeo', 'artigo', 'vídeo','artigo', 'vídeo','artigo', 'vídeo','artigo', 'vídeo', ]), // Seleciona aleatoriamente um tipo de conteúdo de uma lista
        conteudo: faker.lorem.paragraphs(33) // Gera dois parágrafos de texto aleatório
    }
    
     const payloadConteudo = {

        titulo: null,
        descricao: "descricao, tipoConteudo, conteudo",
        tipoConteudo: "testes",
        conteudo: "testes"

    };
    
    it('Case 01 - Deve cadastrar um novo conteúdo e retornar os dados esperados', async () => {
        const responsePost = await request(baseUrl)
            .post('/conteudos')
            .send(payloadConteudoValido);
    
        idConteudo = responsePost.body.id;
    
        expect(responsePost.status).toBe(201);
        expect(idConteudo).toBeDefined();
    
        console.log('Conteúdo cadastrado: ', responsePost.body);
    });


    // it('Case - Titulo NULL - Deve cadastrar um novo conteúdo e retornar os dados esperados', async () => {

    //     const response = await request(baseUrl)
    //         .post('/conteudos')
    //         .send(payloadConteudo);

    //     idConteudo = response.body.id;
    //     expect(response.status).toBe(422);
    //     expect(idConteudo).toBeDefined();
    //     console.log('Conteúdo cadastrado: ', response.body);

    // });


    it('Case 02 - Deve consultar o conteúdo cadastrado e verificar os dados', async () => {

        // const responseGet = await request(baseUrl)

        //     .get(`/conteudos/${idConteudo}`);


        // // Complete a validação do status e do corpo da resposta

        // expect(responseGet.status).toBe(200);
        // // expect(response.body).toEqual(expect.objectContaining({error: 'Os seguintes campos são obrigatórios: titulo'})       
        // expect(responseGet.body).toEqual(expect.objectContaining({ error: 'O conteúdo com o ID: undefined não foi encontrado.' }));
        // //"error": "O conteúdo com o ID: undefined não foi encontrado.",

        // //404 - Conteúdo não encontrado
        // // deveria ser 200 - Conteúdo encontrado


        expect(idConteudo).toBeDefined(); // Verifica se o idConteudo foi definido no teste anterior

        const responseGet = await request(baseUrl)
            .get(`/conteudos/${idConteudo}`);

        expect(responseGet.status).toBe(200);
        expect(responseGet.body).toEqual(expect.objectContaining({
            id: idConteudo,
            titulo: payloadConteudoValido.titulo,
            descricao: payloadConteudoValido.descricao,
            tipoConteudo: payloadConteudoValido.tipoConteudo,
            conteudo: payloadConteudoValido.conteudo
        }));

        console.log('Conteúdo consultado: ', responseGet.body);


    });


    // it('Case 03 - Deve atualizar o conteúdo cadastrado e verificar as alterações', async () => {

    //     const novoPayloadConteudo = {
    //         titulo: faker.lorem.words(3), // Gera uma string com 3 palavras aleatórias
    //         descricao: faker.lorem.sentence(), // Gera uma frase aleatória
    //         tipoConteudo: faker.random.arrayElement(['artigo', 'vídeo', 'podcast', 'infográfico']), // Seleciona aleatoriamente um tipo de conteúdo de uma lista
    //         conteudo: faker.lorem.paragraphs(1) // Gera dois parágrafos de texto aleatório
    //     }

    //     const responsePut = await request(baseUrl)
    //         .put(`/conteudos/${idConteudo}`)
    //         .send(novoPayloadConteudo)

    //     /*expect(responsePut.status).toBe(201);
    //     expect(responsePut.body.nome).toBe(novoPayloadConteudo.nome);
    //     expect(responsePut.body.telefone).toBe(novoPayloadConteudo.telefone);
    //     console.log('Usuário alterado: ', responsePut.body);
    //     */

    //     //validação da alteração dos campos: titulo, descrição, tipoConteudo, conteudo
    //     expect(responsePut.status).toBe(404);
    //     expect(responsePut.body.titulo).toBe(novoPayloadConteudo.titulo);
    //     expect(responsePut.body.descricao).toBe(novoPayloadConteudo.descricao);
    //     expect(responsePut.body.tipoConteudo).toBe(novoPayloadConteudo.tipoConteudo);
    //     expect(responsePut.body.conteudo).toBe(novoPayloadConteudo.conteudo);

    //     //logar resposta do PUT
    //     console.log('Conteúdo alterado: ', response.body);

    //     const responseGet = await request(baseUrl)
    //         .get(`/conteudos/${idConteudo}`)

    //     expect(responseGet.status).toBe(200);
    //     expect(responseGet.body.id).toBe(idConteudo);
    //     expect(responseGet.body.titulo).toBe(novoPayloadConteudo.titulo);
    //     expect(responseGet.body.descricao).toBe(novoPayloadConteudo.descricao);
    //     expect(responseGet.body.tipoConteudo).toBe(novoPayloadConteudo.tipoConteudo);
    //     expect(responseGet.body.conteudo).toBe(novoPayloadConteudo.conteudo);
    //     console.log('Conteúdo alterado resultado da consulta: ', responseGet.body);

    // });

    /*
        it('Case 04 - Deve deletar o conteúdo cadastrado e garantir que ele não exista mais', async () => {
    
            const response = await request(baseUrl)
    
                .delete(`/conteudos/${idConteudo}`);
    
            
    
            // Complete a validação do status da resposta
    
            expect(response.status).toBe(_____); 
    
            
    
            const responseGet = await request(baseUrl)
    
                .get(`/conteudos/${idConteudo}`);
    
            
    
            // Complete a validação do status e do corpo da resposta
    
            expect(responseGet.status).toBe(_____);
    
            expect(responseGet.body).toEqual(expect.objectContaining({
    
                ________________
    
            }));
    
        });
    */
});

//MINHAS CONSIDERAÇÕES
/*
1- No case 01, entendo que o status deveria ser um 200 por se tratar de um cadastro, porem está retornando um 422.
 Além disso, o playload que tem na documentação tem mais informações/campos do que está sendo enviado pelo código. Exemplo:

 Swagger:
    {
        "id": "string",
        "titulo": "string",
        "descricao": "string",
        "tipoConteudo": "string",
        "conteudo": "string",
        "dataCadastro": "2024-08-07T02:56:32.107Z"
  }

playload que está sendo enviado por código:

    {
        titulo: null,
        descricao: "descricao, tipoConteudo, conteudo",
        tipoConteudo: "testes",
        conteudo: "testes"
    };



*/

/* PGATS-2024-06] Automação de Testes de API REST - Segunda chamada

Sua missão será:

Completar os cenários de testes integrados para  que possa ser validada as operações CRUD (POST, PUT, GET, DELETE) na rota de cadastro de conteúdos.

Instruções:

Baixe o código fornecido em seu vsCode e:

1- Complete os testes: Preencha os espaços em branco (_____) com os valores corretos para validação das respostas da API.

2- Valide as operações CRUD: Certifique-se de que as operações de get, post, put e delete estão funcionando corretamente.

3- Verifique o retorno: Garanta que o retorno da API contém os dados esperados fornecidos pela SWAGGER.

4- Envie aqui a sua resposta, se tiver alguma consideração em sua resposta, pode inserir como comentário no final de seu código,
   certifique-se de que o código funcionou corretamente em sua máquina, pois eu apenas irei executá-lo em minha máquina após envio.

*/

//CTS BASE
/*
const request = require('supertest');

const baseUrl = 'http://localhost:3000';

describe('Testes integrados para a rota de conteúdos', () => {

    let idConteudo;

    const payloadConteudo = {

        titulo: null,

        descricao: "descricao, tipoConteudo, conteudo",

        tipoConteudo: "testes",

        conteudo: "testes"

    };

    it('Deve cadastrar um novo conteúdo e retornar os dados esperados', async () => {

        const response = await request(baseUrl)

            .post('/conteudos')

            .send(payloadConteudo);

        

        // Complete a validação do status e do corpo da resposta

        expect(response.status).toBe(_____);

        expect(response.body).toEqual(expect.objectContaining({

            ________________

        }));

        idConteudo = response.body.id;

    });


    it('Deve consultar o conteúdo cadastrado e verificar os dados', async () => {

        const response = await request(baseUrl)

            .get(`/conteudos/${idConteudo}`);

        

        // Complete a validação do status e do corpo da resposta

        expect(response.status).toBe(_____);

        expect(response.body).toEqual(expect.objectContaining({

            ________________

        }));

    });


    it('Deve atualizar o conteúdo cadastrado e verificar as alterações', async () => {

        const novoPayloadConteudo = {

            titulo: "Novo Título",

            descricao: "Nova descrição, tipoConteudo, conteudo",

            tipoConteudo: "novo tipo",

            conteudo: "novo conteudo"

        };


        const response = await request(baseUrl)

            .put(`/conteudos/${idConteudo}`)

            .send(novoPayloadConteudo);

        

        // Complete a validação do status e do corpo da resposta

        expect(response.status).toBe(_____);

        expect(response.body).toEqual(expect.objectContaining({

            ________________

        }));

    });


    it('Deve deletar o conteúdo cadastrado e garantir que ele não exista mais', async () => {

        const response = await request(baseUrl)

            .delete(`/conteudos/${idConteudo}`);

        

        // Complete a validação do status da resposta

        expect(response.status).toBe(_____); 

        

        const responseGet = await request(baseUrl)

            .get(`/conteudos/${idConteudo}`);

        

        // Complete a validação do status e do corpo da resposta

        expect(responseGet.status).toBe(_____);

        expect(responseGet.body).toEqual(expect.objectContaining({

            ________________

        }));

    });

});

*/