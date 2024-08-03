// const request = require('supertest');
// const rota = "http://localhost:3000";

// describe('Suite de teste da api users...', () => {

//     const json_arquivo_cadastro_usuario = {
//         nome: "Diogo do Teste",
//         telefone: "(11) 12345-6789",
//         email: "souDeQAa@3@usuario4.com", // nossa chave unica
//         senha: "1232"
//     }

//     const json_arquivo_cadastro_usuario_dados_ausentes = {
//         nome: "",
//         telefone: "",
//         email: "batata@vaitester422.com.br",
//         senha: ""
//     }

//     const json_teste_conteudo_vazio = {
//         nome: "",
//         telefone: "",
//         email: "",
//         senha: ""
//     }

//     const json_teste_sem_conteudo = {
        
//     }

//     let idUsuario;

//     it('CT001 - Deve cadastrar um novo usuario, e retornar 201.', async () => {
//         // construindo a requisição, e passando a rota completa
//         const response = await request(rota)
//             .post('/users')
//             // precisamos informar os dados que serão enviados no body.
//             // no primeiro momento, não estamos usando uma biblioteca para gerar massa de teste. Por isso, o (json_arquivo_cadastro_usuario) pode exibir erro.
//             .send(json_arquivo_cadastro_usuario)
//         // teste do retorno de status 201
//         expect(response.status).toBe(201);
//         console.log(response.body);
//     });

//     it.only('CT002 - Criação de usuário com dados válidos, deve retornar a resposta', async () => {
//         // Atividade A, serve para o B
//         const response = await request(rota)
//             .post('/users')
//             .send(json_arquivo_cadastro_usuario) // no primeiro momento, não estamos usando uma biblioteca para gerar massa de teste. Por isso, o (json_arquivo_cadastro_usuario) pode exibir erro.
//         expect(response.body).toBeDefined(); // vai retornar o Corpo do conteudo do body e ainda fala que a resposta do body tem um corpo e tem um registro e não está nulla ou vazia.
//         expect(response.body).toHaveProperty('id'); // asserção p/ verificar se na response.body existe a propiedade, ai devo informar a propriedade que eu quero.
//         expect(response.status).toBe(201);

//         idUsuario = response.body.id
//         console.log('Usuário cadastrado:', idUsuario);

//         /*dicas: 
//          - Após o cadastro "POST", armazene o resultado em uma variável.
//          - Essa variavel já deverá estar definida...
//          - Lembre-se que para você acessar o objeto de um playload você pode usar response.body.objetoDesejado.
//         */

//     });

//     it.only('CT003 - Deve consultar o usuário cadastrado anteriormente, e logar o registro do usuário cadastrado como retornado', async () => {
//         // Atividade B, depende do A        
//         const response = await request(rota)
//             .get(`/users/${idUsuario}`);

//         expect(response.status).toBe(200); //valida o status
//         expect(response.body).toBeDefined(); // vai retornar o Corpo do conteudo do body e ainda fala que a resposta do body tem um corpo e tem um registro e não está nulla ou vazia.
//         expect(response.body).toHaveProperty('id', idUsuario); // asserção p/ verificar se na response.body existe a propiedade, ai devo informar a propriedade que eu quero.     
//         console.log('Usuário retornado: ', response.body);
//     });

//     it.only('CT004 - Alterando o registro cadastrado anteriormente. Método PUT', async () => {
//        // Atividade C, depende do A
       
//        const novoPayload ={
//             nome: "Batatão do Teste",
//             telefone: "(31) 91234-5678",
//             email: "garrafa@teste.com", //nossa chave unica
//             senha: "54321"
//        }
       
//        const responseUpdate = await request(rota)
//             .put(`/users/${idUsuario}`)
//             .send(novoPayload)

//         expect(responseUpdate.status).toBe(201);
//         expect(responseUpdate.body.nome).toBe(novoPayload.nome); //valida se o nome que estou enviando é de fato o que deve ser alterado
//        console.log(responseUpdate.body)

//         /*dicas: 
//          - com a variável armazenada, chame o método put, passando payload com a alteração do nome do usuário,
//          - não esqueça de passar todos os campos que sejam obrigatórios
//         */
//     })

//     it('CT005 - Criação de usuário com dados válidos, deve retornar o "Corpo do Objeto do usuário" criado e um status 201.', async () => {
//         // Atividade 2
//         const response = await request(rota)
//             .post('/users')
//             .send(json_arquivo_cadastro_usuario) // no primeiro momento, não estamos usando uma biblioteca para gerar massa de teste. Por isso, o (json_arquivo_cadastro_usuario) pode exibir erro.
//         expect(response.body).toBeDefined(); // vai retornar o Corpo do conteudo do body e ainda fala que a resposta do body tem um corpo e tem um registro e não está nulla ou vazia.
//         expect(response.status).toBe(201);
//         console.log(response.body);
//     });

//     it('CT006 - Deve Cadastrar usuário com Dados Ausentes, e lançar um Erro e retornar um status 422 apresentando uma mensagem descritiva e detalhada do erro', async () => {
//         // Atividade 3
//         const response = await request(rota)
//             .post('/users')
//             .send(json_arquivo_cadastro_usuario_dados_ausentes)
//         expect(response.body).toBeDefined();
//         expect(response.status).toBe(422)
//         console.log(response.body);
//     });

//     it('CT007 - Criação de usuário com dados inválidos, deve retornar 422 e a mensagem de erro como resposta.', async () => {
//         const response = await request(rota)
//             .post('/users')
//             .send(json_arquivo_cadastro_usuario)
//         expect(response.body).toBeDefined();
//         expect(response.status).toBe(422);
//         console.log(response.body)
//     })

//     it('CT008 - Cadastro com conteúdo do Json VAZIO, deve retornar status 422 e apresentando uma mensagem descritiva e detalhada com o erro "Os seguintes campos são obrigatórios: nome, telefone, email, senha".', async () => {
//         const response = await request(rota)
//             .post('/users')
//             .send(json_teste_conteudo_vazio)
//         expect(response.status).toBe(422);
//         console.log(response.body);
//     });

// });

// /*
//     const json_teste_POSTusersComOcampoEmailComoBooleano = {
//         "nome": "Usuario Teste",
//         "telefone": "1234567890",
//         "email": "usuario@example.com",
//         "senha": false
//     }

//     const json_teste_POSTusersComoCampoEmailComoArray = {
//         "nome": "Usuario Teste",
//         "telefone": "1234567890",
//         "email": ["usuario@example.com", "usuario@work.com"],
//         "senha": "senha123"
//     }

//     const json_teste_POSTusersComoCampoSenhaComoArray = {
//         "nome": "Usuario Teste",
//         "telefone": "1234567890",
//         "email": ["usuario@example.com", "usuario@work.com"],
//         "senha": "senha123"
//     }

//     const json_teste_POSTusersComOCampoSenhaComoBooleano = {
//         "nome": "Usuario Teste",
//         "telefone": "1234567890",
//         "email": "usuario@example.com",
//         "senha": false
//     }

//     it('Consulta todos os usuários...deve retornar status 200.', async () => {
//         const response = await request(rota).get('/users');
//         expect(response.status).toBe(200);
//         //expect(response.status).toBe(201); // vai dar erro
//     });
 
//     it('Deve cadastrar um novo usuario, e retornar 200.', async () => {
//         // construimos a nossa requisição, passando a rota completa
//         const response = await request(rota)
//             .post('/users')
//             // precisamos construir os dados que serão enviados no body
//             .send(json_arquivo_cadastro_usuario)
//         // teste do retorno de status 200
//         expect(response.status).toBe(201);
//         console.log(response.body);
//     });
  
//     it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
//         const response = await request(rota)
//             .post('/users')
//             .send(json_teste_sem_conteudo)
//         expect(response.status).toBe(422);
//         //expect(response.body).toEqual(json_teste_sem_conteudo);
//         console.log(response.body);
//     });
 
//     it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
//         const response = await request(rota)
//             .post('/users')
//             .send(json_teste_POSTusersComOcampoSenhaComoBooleano)
//         expect(response.status).toBe(422);
//        // expect(response.body).toEqual(json_teste_POSTusersComOcampoSenhaComoBooleano);
//         console.log(response.body);
//     });
 
//     it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
//         const response = await request(rota)
//             .post('/users')
//             .send(json_teste_POSTusersComoCampoEmailComoArray)
//         expect(response.status).toBe(422);
//         //expect(response.body).toEqual(json_teste_POSTusersComoCampoEmailComoArray);
//         console.log(response.body);
//     });
 
//     it('Quando cadastrar um usuario que ja esteja na base, deve retornar 422.', async () => {
//         const response = await request(rota)
//             .post('/users')
//             .send(json_teste_POSTusersComOCampoSenhaComoBooleano)
//         expect(response.status).toBe(422);
//         //expect(response.body).toEqual(json_teste_POSTusersComOCampoSenhaComoBooleano);
//         console.log(response.body);
//     });
// */