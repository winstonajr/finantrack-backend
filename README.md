# FinanTrack API 💸

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

API RESTful completa para gerenciamento financeiro pessoal. Este projeto foi construído do zero com foco em boas práticas de desenvolvimento, segurança e escalabilidade, servindo como a base de backend para a plataforma FinanTrack.

**[Acesse a API em produção aqui!](https://finantrack-backend.onrender.com/api/health)** (Substitua pela sua URL do Render)

## ✨ Funcionalidades

- **Autenticação de Usuários:** Sistema completo de registro e login com senhas criptografadas (bcrypt).
- **Gerenciamento de Sessão com JWT:** Rotas protegidas utilizando JSON Web Tokens para garantir que apenas usuários autenticados possam acessar e modificar seus próprios dados.
- **CRUD Completo de Transações:** Usuários podem criar, ler, atualizar e deletar suas transações financeiras.
- **Segurança:** Implementação de lógica de autorização para garantir que um usuário não possa ver, editar ou apagar dados de outro usuário.
- **Agregação de Dados:** Endpoint de resumo para calcular o total de receitas, despesas e o balanço final de forma eficiente.
- **Deploy Contínuo:** Configurado para deploy automatizado na plataforma Render a cada `push` na branch `main`.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JSON Web Token (JWT), bcrypt.js
- **Deploy:** Render

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar a API na sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/finantrack-backend.git](https://github.com/SEU_USUARIO/finantrack-backend.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd finantrack-backend
    ```

3.  **Crie o arquivo de variáveis de ambiente:**
    - Copie o conteúdo do arquivo `.env.example` para um novo arquivo chamado `.env`.
    - Preencha as variáveis no `.env` com suas credenciais do banco de dados e um segredo para o JWT.

4.  **Instale as dependências:**
    ```bash
    npm install
    ```

5.  **Execute as migrações do banco de dados:**
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A API estará rodando em `http://localhost:3001`.

## Endpoints da API

A URL base da API é `/api`. Todas as rotas que necessitam de autenticação devem incluir o `Bearer Token` no cabeçalho `Authorization`.

---

### Autenticação (`/auth`)

| Método | Endpoint         | Protegida | Descrição                         | Corpo da Requisição (Exemplo)                                    |
| ------ | ---------------- | --------- | ----------------------------------- | ---------------------------------------------------------------- |
| `POST` | `/register`      | Não       | Registra um novo usuário.         | `{"name": "...", "email": "...", "password": "..."}`            |
| `POST` | `/login`         | Não       | Autentica um usuário e retorna um token JWT. | `{"email": "...", "password": "..."}`                            |

---

### Transações (`/transactions`)

| Método   | Endpoint     | Protegida | Descrição                                    | Corpo da Requisição (Exemplo)                                |
| -------- | ------------ | --------- | -------------------------------------------- | ------------------------------------------------------------ |
| `POST`   | `/`          | Sim       | Cria uma nova transação para o usuário logado. | `{"description": "...", "amount": 150.50, "type": "expense", "date": "..."}` |
| `GET`    | `/`          | Sim       | Lista todas as transações do usuário logado.   | N/A                                                          |
| `GET`    | `/summary`   | Sim       | Retorna um resumo financeiro do usuário logado. | N/A                                                          |
| `PATCH`  | `/:id`       | Sim       | Atualiza uma transação específica.             | `{"description": "...", "amount": 200}`                      |
| `DELETE` | `/:id`       | Sim       | Deleta uma transação específica.               | N/A                                                          |

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.