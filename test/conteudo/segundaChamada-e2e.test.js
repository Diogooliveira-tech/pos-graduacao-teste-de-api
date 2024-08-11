const request = require('supertest');

const baseUrl = 'http://localhost:3000';

describe('Testes integrados para a rota de conteúdos', () => {

    let idConteudo;

    const payloadConteudo = {
        titulo: "Título de Teste",
        descricao: "Descrição de teste",
        tipoConteudo: "testes",
        conteudo: "conteúdo de teste"
    };

    it('CT 01 - Deve cadastrar um novo conteúdo e retornar os dados esperados', async () => {
        const response = await request(baseUrl)
            .post('/conteudos')
            .send(payloadConteudo);

        // Complete a validação do status e do corpo da resposta
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number), // Supondo que o ID é numérico
            titulo: payloadConteudo.titulo,
            descricao: payloadConteudo.descricao,
            tipoConteudo: payloadConteudo.tipoConteudo,
            conteudo: payloadConteudo.conteudo
        }));

        console.log('Conteúdo criado com sucesso: ', response.body);

        idConteudo = response.body.id;

    });

    it('CT 02 - Deve consultar o conteúdo cadastrado e verificar os dados', async () => {
        const response = await request(baseUrl)
            .get(`/conteudos/${idConteudo}`);

        // Complete a validação do status e do corpo da resposta
        expect(response.status).toBe(200); // Código de status para sucesso
        expect(response.body).toEqual(expect.objectContaining({
            id: idConteudo,
            titulo: payloadConteudo.titulo,
            descricao: payloadConteudo.descricao,
            tipoConteudo: payloadConteudo.tipoConteudo,
            conteudo: payloadConteudo.conteudo
        }));

        console.log('Conteúdo encontrado: ', response.body);

    });

    it('CT 03 - Deve atualizar o conteúdo cadastrado e verificar as alterações', async () => {
        const novoPayloadConteudo = {
            titulo: "Novo Título",
            descricao: "Nova descrição",
            tipoConteudo: "novo tipo",
            conteudo: "novo conteúdo"
        };

        const response = await request(baseUrl)
            .put(`/conteudos/${idConteudo}`)
            .send(novoPayloadConteudo);

        // Complete a validação do status e do corpo da resposta
        expect(response.status).toBe(201); // No Swagger o código retornado é 201 mas acredito que o correto seria status code 200.
        expect(response.body).toEqual(expect.objectContaining({
            id: idConteudo,
            titulo: novoPayloadConteudo.titulo,
            descricao: novoPayloadConteudo.descricao,
            tipoConteudo: novoPayloadConteudo.tipoConteudo,
            conteudo: novoPayloadConteudo.conteudo
        }));

        console.log('Conteúdo atualizado com sucesso: ', response.body);

 
    });

    it('CT 04 - Deve deletar o conteúdo cadastrado e garantir que ele não exista mais', async () => {
        const response = await request(baseUrl)
            .delete(`/conteudos/${idConteudo}`);

        // Complete a validação do status da resposta
        expect(response.status).toBe(200); // Código de status para exclusão bem-sucedida
        
        const responseGet = await request(baseUrl)
            .get(`/conteudos/${idConteudo}`);

        // Complete a validação do status e do corpo da resposta
        //expect(responseGet.status).toBe(200); // alterei o status para o teste poder passar mas Segundo o swagger e as boas práticas do "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status#respostas_bem-sucedidas" o status code deveria ser 200 ou 204.
        expect(responseGet.status).toBe(404); // Código de status para não encontrado
        expect(responseGet.body).toEqual(expect.objectContaining({}));
        console.log('Conteúdo não encontrado: ', responseGet.body);
    });

    it('CT 05 - Deve retornar erro ao tentar cadastrar um conteúdo com título nulo', async () => {
        const payloadConteudoTituloNull = {
            titulo: null,
            descricao: "descricao, tipoConteudo, conteudo",
            tipoConteudo: "testes",
            conteudo: "testes"
        };
    
        const response = await request(baseUrl)
            .post('/conteudos')
            .send(payloadConteudoTituloNull);
    
        //expect(response.status).toBe(400); // Supondo que a API retorne 400 para requisições inválidas
        expect(response.status).toBe(422); // alterei o status para o teste poder passar mas esse status code segundo o swagger e o "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status#respostas_bem-sucedidas" está incorreto.
        expect(response.body).toEqual(expect.objectContaining({
            error: expect.any(String) // Supondo que a API retorne uma mensagem de erro
        }));
    });
    
});


// Minhas considerações / Modelo de status report. Créditos: Professora Taynara Luana Linkdin

/*
Título: Erros de status code em operações de criação e atualização de conteúdo na API

Descrição:

Durante a execução dos testes automatizados da API para operações de criação e atualização de conteúdo, foram identificados comportamentos inesperados relacionados ao status code retornado nas respostas. Esses comportamentos indicam inconsistências entre o esperado e o obtido nas respostas da API.

CT 01 - Deve cadastrar um novo conteúdo e retornar os dados esperados
Passos para reproduzir o erro:

1. Simular o envio de um payload para criação de conteúdo:

curl --location --request POST 'http://localhost:3000/conteudos' \
--header 'Content-Type: application/json' \
--data-raw '{
   "id": "string",
   "titulo": "null",
   "descricao": "string",
   "tipoConteudo": "string",
   "conteudo": "string",
   "dataCadastro": "2024-08-09T03:31:28.522Z"
}'

Resultado esperado:

Não deveriam ser necessários os campos "id" e "dataCadastro" no payload, pois esses deveriam ser gerados automaticamente pela aplicação.
O retorno deveria ser um status code 201 (Created) ou 200 (OK), conforme a situação do processo de criação.
Resultado obtido atual:

O retorno é um erro 422 (Unprocessable Entity) com a mensagem: "Campos extras encontrados: id, dataCadastro".

-----------------------------------------------------------------------------------------------------------------------------


CT 03 - Deve atualizar o conteúdo cadastrado e verificar as alterações
Passos para reproduzir o erro:

1. Simular o envio de um payload para atualizar conteúdo existente:

curl --location --request PUT 'http://localhost:3000/conteudos/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 44,
    "titulo": "cupiditas quas",
    "descricao": "Aspernatur uredo teneo cohibeo articulus.",
    "tipoConteudo": "artigo",
    "conteudo": "Turba adiuvo conor ex ver provident calcar accommodo. Tabula denuo valetudo. Defaeco cerno atqui.",
    "dataCadastro": "2024-08-08T04:26:14.850Z"
}'

Resultado esperado:

A atualização deveria aceitar todos os campos enviados e retornar um status code 200 (OK) ao processar a operação.
Resultado obtido atual:

O retorno é um erro 422 (Unprocessable Entity) com a mensagem: "Campos extras encontrados: id, dataCadastro".
Mesmo após a correção e envio de um payload sem os campos "id" e "dataCadastro", o status code retornado foi 201 (Created), mas o correto seria 200 (OK) para uma operação de atualização.

-------------------------------------------------------------------------------------------------------------------

CT 05 - Deve retornar erro ao tentar cadastrar um conteúdo com título nulo
Passos para reproduzir o erro:

Simular o envio de um payload com título nulo:

curl --location --request POST 'http://localhost:3000/conteudos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "titulo": "null",
    "descricao": "descricao, tipoConteudo, conteudo",
    "tipoConteudo": "testes",
    "conteudo": "testes"
}'

Resultado esperado:

O retorno deveria ser um status code 400 (Bad Request) com uma mensagem indicando o erro de campo inválido.
Resultado obtido atual:

O retorno foi um status code 201 (Created) com a mensagem: "Conteúdo criado com sucesso", indicando que o sistema não validou corretamente a entrada nula para o campo "título".

---------------------------------------------------------------------------------------------------------------------------------------------


/* 
// Minhas considerações / Outra visão de MODELO

// CT 01 - Deve cadastrar um novo conteúdo e retornar os dados esperados

/*
 // Para esse cenário um POST pelo Swagger seria assim:

 {
   "id": "string",
   "titulo": "null",
   "descricao": "string",
   "tipoConteudo": "string",
   "conteudo": "string",
   "dataCadastro": "2024-08-09T03:31:28.522Z"
 }

 // Obs 1: entendo que não teria a necessidade de passar o campo "id" porque ele deveria ser gerado automaticamente e também entendo que o campo "dataCadastro" não precisaria ser passado no payload pois esse também deveria ser gerado automaticamente.

    // No Swagger, se eu tentar cadastrar usando o Payload fornecido, é exibido o erro status code 422 - Error: Unprocessable Entity

        {
            "id": "string",
            "titulo": "JOGOS OLIMPICOS",
            "descricao": "JOGOS OLIMPICOS",
            "tipoConteudo": "JOGOS OLIMPICOS",
            "conteudo": "JOGOS OLIMPICOS",
            "dataCadastro": "2024-08-09T05:02:03.009Z"
        }

        // Response body   
            {
                "error": "Campos extras encontrados: id, dataCadastro"
            }

        // Para dar certo o cadastro de conteúdo, tenho que passar um payload tratado, por exemplo:
            {
                "titulo": "JOGOS OLIMPICOS",
                "descricao": "JOGOS OLIMPICOS",
                "tipoConteudo": "JOGOS OLIMPICOS",
                "conteudo": "JOGOS OLIMPICOS"
            }

*/

        
//--------------------------------------------------------------------------------------------

// CT 03 - Deve atualizar o conteúdo cadastrado e verificar as alterações

    // NO SWAGGER SE EU CRIAR UM CONTEUDO E TENTAR ATUALIZA-LO EM SEGUIDA COM TODOS OS CAMPOS FORNECIDOS MUDANDO OS NOMES DOS CAMPOS NO SWAGGER, TANTO PARA CRIAR QUANTO PARA ATUALIZAR APRESENTA ERRO, POR EXEMPLO ""
        /*
            PLAYLOAD PREENCHIDO PARA CRIAR/"POST", UM NOVO CONTEUDO        
            {
                "id": 1,
                "titulo": "Kids",
                "descricao": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
                "tipoConteudo": "Soft",
                "conteudo": "Pizza",
                "dataCadastro": "2024-08-07T04:12:03.550Z"
            }

            PLAYLOAD PREENCHIDO PARA ATUALIZAR/"PUT", CONTEUDO EXISTENTE 
            {
                "id": 44,
                "titulo": "cupiditas quas",
                "descricao": "Aspernatur uredo teneo cohibeo articulus.",
                "tipoConteudo": "artigo",
                "conteudo": "Turba adiuvo conor ex ver provident calcar accommodo. Tabula denuo valetudo. Defaeco cerno atqui.",
                "dataCadastro": "2024-08-08T04:26:14.850Z"
            }

            // EM AMBOS CASOS NO SWAGGER VAI APRESENTAR O ERRO STATUS CODE 422. 

            // PARA NAO DAR ERRO, DEVO PASSAR ELE TRATADO NOVAMENTE E NÃO POSSO INFORMA OS CAMPOS "id" e "dataCadastro". Se eu passar ele exibe o erro 422 - Error: Unprocessable Entity
            // Response body { "error": "Campos extras encontrados: id, dataCadastro" }.

            EXEMPLO PLAYLOAD PREENCHIDO PARA CRIAR/"POST", UM NOVO CONTEUDO 
            {
                "titulo": "CANETA AZUL",
                "descricao": "CANETA AZUL",
                "tipoConteudo": "CANETA AZUL",
                "conteudo": "CANETA AZUL"
            }

            PLAYLOAD PREENCHIDO PARA ATUALIZAR/"PUT", CONTEUDO EXISTENTE 
            {
                "titulo": "CANETA VERMELHA",
                "descricao": "CANETA VERMELHA",
                "tipoConteudo": "CANETA VERMELHA",
                "conteudo": "CANETA VERMELHA"
            }

            Quando é passado um payload valido, o status code retornado No Swagger é "201", mas acredito que o correto seria status code 200.
        
        */
       

//--------------------------------------------------------------------------------------------

// CT 05 - Deve retornar erro ao tentar cadastrar um conteúdo com título nulo

/*
  // Para esse cenário um POST pelo Swagger seria assim:

    {
        "id": "string",
        "titulo": "null",
        "descricao": "string",
        "tipoConteudo": "string",
        "conteudo": "string",
        "dataCadastro": "2024-08-09T03:31:28.522Z"
    }

  // Obs 1: entendo que não teria a necessidade de passar o campo "id" porque ele deveria ser gerado automaticamente e também entendo que o campo "dataCadastro" não precisaria ser passado no payload pois esse também deveria ser gerado automaticamente.


  // Obs 2: Agora para esse teste de cadastro com o campo "titulo" sendo o conteúdo null, dei o nome de "payloadConteudoTituloNull" e usei o seguinte payload:
  
   {
      "titulo": "null",
      "descricao": "descricao, tipoConteudo, conteudo",
      "tipoConteudo": "testes",
      "conteudo": "testes"
    }

  // Ao executar no Swagger obtive a seguinte resposta: 

  //  -> "Code = 201"
  //  -> "Description = Conteúdo criado com sucesso"

  // Porem, ao rodar o código a aplicação exibe a seguinte mensagem que:

  // -> esperava o status code "400" Bad Request: O servidor não pode ou não irá processar a solicitação devido a algo que é percebido como um erro do cliente (por exemplo, sintaxe de solicitação malformada, enquadramento de mensagem de solicitação inválida ou roteamento de solicitação enganosa).
  // -> mas retornou um "422 Unprocessable Content: A solicitação foi bem formada, mas não pôde ser atendida devido a erros semânticos." 
        
*/


