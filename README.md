# IA Receitas - Backend (Node.js/Express) ⚙️

API RESTful responsável por gerenciar a comunicação com o modelo Gemini (Google AI Studio) e garantir que a resposta seja entregue em formato estruturado (JSON).
Este back-end foi desenvolvido para atuar como intermediário entre o front-end e a IA.
Ele recebe mensagens enviadas pelo usuário, processa utilizando o modelo Gemini, e retorna uma resposta pronta.

## 🧩 Arquitetura

* **Linguagem:** JavaScript (Node.js)
* **Framework:** Express
* **Integração IA:** Google Gen AI SDK
* **Recursos:** CORS e Dotenv

## 🔑 Desafio Principal: Robustez do JSON

Para garantir que a aplicação não quebrasse devido a respostas textuais da IA, implementou-se um serviço de extração de JSON via **Expressões Regulares (Regex)** no texto de saída do Gemini.

## 🚀 Endpoints

A API está exposta em uma rota principal que espera uma requisição `POST`:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **POST** | `/api/gemini/generate` | Gera ou modifica uma receita baseada no `sessionId` e `dish`. |

### Estrutura da Requisição (`POST Body`)

```json
{
  "sessionId": "string_unica_por_usuario",
  "dish": "string_com_o_pedido_da_receita"
}
```

Estrutura da Resposta (JSON)

```json

{
  "titulo": "string",
  "ingredientes": ["array", "de", "strings"],
  "modoPreparo": ["array", "de", "strings"]
}

```

Deploy 🌐

Esta API está hospedada no Render.

🔗 Acesse o projeto: https://dashboard.render.com/web/srv-d4p1inpr0fns73cltjfg
