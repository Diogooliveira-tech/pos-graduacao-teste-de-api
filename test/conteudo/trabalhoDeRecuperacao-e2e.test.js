const request = require('supertest');

const baseUrl = 'http://localhost:3000';

describe('Testes GET, POST rota conteúdos do Trabalho de Recuperação API Rest', () => {

    it('CT01 - recuperação - Deve consultar lista de conteudos e verificar se o status da resposta é 200 e que o corpo da resposta é um array', async () => {
        const responseGet = await request(baseUrl)
            .get('/conteudos');

        expect(responseGet.status).toBe(200);
        // Verificar se o corpo da resposta é um array
        expect(Array.isArray(responseGet.body)).toBe(true);

        // Verificar se o array contém ao menos um objeto com os campos esperados
        if (responseGet.body.length > 0) {
            expect(responseGet.body[0]).toEqual(expect.objectContaining({
                titulo: expect.any(String),
                descricao: expect.any(String),
                tipoConteudo: expect.any(String),
                conteudo: expect.any(String)
            }));
        } else {
            console.log('Nenhum conteúdo encontrado.');
        }

        console.log('Conteúdos encontrados: ', responseGet.body);

    });

    it('CT02 - recuperação - Deve Retorna 201 e ID no corpo ao criar conteúdo com sucesso.', async () => {
        const payloadConteudoCriaConteudo = {
            titulo: "Novo Conteúdo",
            descricao: "Descrição do conteúdo", "tipoConteudo": "Artigo",
            conteudo: "Conteúdo do artigo"
        };

        const responsePost = await request(baseUrl)
            .post('/conteudos')
            .send(payloadConteudoCriaConteudo);

        idConteudo = responsePost.body.id;
        expect(responsePost.status).toBe(201);
        expect(idConteudo).toBeDefined();
        expect(responsePost.body.id).toBe(idConteudo);
        console.log(responsePost.body);
        console.log('Conteúdo criado com sucesso: ', responsePost.body);

    });

    it('CT03 - recuperação - Deve retornar status code 422 e mensagem de erro: Os seguintes campos são obrigatórios: titulo', async () => {
        const payloadConteudoTituloNull = {
            titulo: null,
            descricao: "descricao, tipoConteudo, conteudo",
            tipoConteudo: "testes",
            conteudo: "testes"
        };

        const responsePost = await request(baseUrl)
            .post('/conteudos')
            .send(payloadConteudoTituloNull);

        expect(responsePost.status).toBe(422);
        expect(responsePost.body).toBeDefined();
        expect(responsePost.body).toEqual({ error: 'Os seguintes campos são obrigatórios: titulo' });
        console.log(responsePost.body);
    });

});