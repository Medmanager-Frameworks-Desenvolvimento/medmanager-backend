# MedManager - Backend

O MedManager é um sistema desenvolvido para otimizar o gerenciamento de pacientes idosos, permitindo o controle de prescrições médicas, administração de medicamentos e acompanhamento por enfermeiros.

Este repositório contém a API responsável por fornecer os recursos e regras de negócio da aplicação.

<br>

## ⚙️ Funcionalidades

- **Cadastro e autenticação de administradores**: permite o registro e acesso seguro ao sistema por meio de autenticação e controle de todos os dados.

- **Gerenciamento de pacientes**: permite cadastrar, visualizar, atualizar e remover informações dos pacientes.

- **Gerenciamento de medicamentos**: permite cadastrar, visualizar, atualizar e remover medicamentos do sistema.

- **Consulta ao catálogo de medicamentos**: permite pesquisar medicamentos a partir do catálogo baseado nos dados da ANVISA, facilitando a busca por nomes comerciais válidos e padronizados.

- **Gerenciamento de enfermeiros**: permite cadastrar, visualizar, atualizar e remover informações dos enfermeiros.

- **Gerenciamento de prescrições**: permite cadastrar, visualizar, atualizar e remover prescrições médicas, associando pacientes e medicamentos.

- **Alertas e notificações em tempo real**: envia alertas e notificações automáticas no momento programado para a medicação, auxiliando no cumprimento correto da prescrição.

<br>

## 💻 Tecnologias Utilizadas

- **NestJS**: Framework progressivo para Node.js utilizado na construção da API, baseado em TypeScript e arquitetura modular.

- **Node.js**: Ambiente de execução JavaScript utilizado para rodar a aplicação no backend.

- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.

- **Prisma ORM**: ORM utilizado para acesso e manipulação do banco de dados de forma tipada.

- **PostgreSQL (via Prisma Adapter PG)**: Banco de dados relacional utilizado para persistência das informações do sistema.

- **JWT (@nestjs/jwt)**: Tecnologia utilizada para autenticação baseada em tokens, garantindo segurança no acesso às rotas protegidas.

- **bcrypt**: Biblioteca utilizada para criptografia de senhas, aumentando a segurança das credenciais dos usuários.

- **WebSockets (@nestjs/websockets + Socket.IO)**: Tecnologia utilizada para comunicação em tempo real, especialmente para notificações do sistema.

- **Axios**: Biblioteca utilizada para consumo de APIs externas e requisições HTTP.

- **@nestjs/schedule**: Módulo utilizado para agendamento de tarefas automáticas (cron jobs), como verificações periódicas do sistema.

- **Swagger (@nestjs/swagger)**: Ferramenta utilizada para documentação automática da API, facilitando testes e integração.

- **class-validator**: Biblioteca utilizada para validação de dados nas requisições da API.

- **class-transformer**: Biblioteca utilizada para transformação de objetos e controle de serialização de dados.

- **csv-parser**: Biblioteca utilizada para leitura e processamento de arquivos CSV, aplicada no catálogo de medicamentos da ANVISA.

- **RxJS**: Biblioteca reativa utilizada pelo NestJS para lidar com programação assíncrona baseada em streams.

<br>

## 🚀 Como testar localmente

- Clone o repositório, utilizando o camando:
```bash
git clone https://github.com/Medmanager-Frameworks-Desenvolvimento/medmanager-backend.git
```

- Renomeie o arquivo `.env.example` para `.env` e adicione as credenciais necessárias:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
SECRET_KEY=your_secret_key
```

- Instale as dependências do projeto:
```bash
npm install
```

- Gere o Prisma Client:
```bash
npx prisma generate
```

- Execute as migrations do Prisma (criação das tabelas no banco de dados):
```bash
npx prisma migrate dev
```

- Execute o seed do Prisma para popular o banco de dados com dados iniciais (medicamentos da ANVISA):
```bash
npx prisma db seed
```

- Inicie o servidor em modo desenvolvimento:
```bash
npm run start:dev
```

- Para utilizar a aplicação completa, acesse também o repositório do frontend:
[MedManager Frontend](https://github.com/Medmanager-Frameworks-Desenvolvimento/medmanager-frontend)

<br>

## 📁 Estrutura do Projeto

```
medmanager-backend
│
│── prisma
│ │── migrations/   # Histórico de migrações do banco de dados (Prisma)
│ │── schema.prisma   # Schema principal do banco de dados
│ │── seed.ts   # Script para popular o banco com dados iniciais (ex: medicamentos ANVISA)
│
│── src
│ │── app.controller.spec.ts  # Testes do controller principal
│ │── app.controller.ts   # Controller base da aplicação
│ │── app.module.ts   # Módulo principal da aplicação
│ │── app.service.ts  # Service base da aplicação
│ │── main.ts   # Ponto de entrada da aplicação NestJS
│
│ │── common  # Recursos reutilizáveis globalmente
│ │ │── decorators
│ │ │ ├── current-admin.decorator.ts  # Extrai admin autenticado da requisição
│ │ │ ├── index.ts
│ │ │ ├── public.decorator.ts   # Marca rotas públicas (sem autenticação)
│
│ │── database  # Configuração e acesso ao banco de dados
│ │ │── database.module.ts  # Módulo de conexão com o Prisma
│ │ │── prisma.service.spec.ts  # Testes do Prisma Service
│ │ │── prisma.service.ts   # Serviço principal do Prisma
│
│ │── generated
│ │ │── prisma/   # Código gerado automaticamente pelo Prisma Client
│
│ │── modules   # Módulos principais da aplicação (arquitetura modular NestJS)
│
│ │ │── admin   # Módulo de administração do sistema
│ │ │ │── admin.controller.spec.ts
│ │ │ │── admin.controller.ts   # Rotas HTTP do admin
│ │ │ │── admin.module.ts
│ │ │ │── admin.service.spec.ts
│ │ │ │── admin.service.ts  # Regras de negócio do admin
│ │ │ │── dto
│ │ │ │ ├── create-admin.dto.ts
│ │ │ │ ├── update-admin.dto.ts
│
│ │ │── auth  # Autenticação e segurança (JWT)
│ │ │ │── auth.controller.spec.ts
│ │ │ │── auth.controller.ts
│ │ │ │── auth.guard.ts   # Proteção de rotas com JWT Guard
│ │ │ │── auth.module.ts
│ │ │ │── auth.service.spec.ts
│ │ │ │── auth.service.ts
│ │ │ │── dto
│ │ │ │ ├── sign-in.dto.ts
│
│ │ │── enfermeiros   # CRUD de enfermeiros
│ │ │ │── dto
│ │ │ │ ├── create-enfermeiro.dto.ts
│ │ │ │ ├── update-enfermeiro.dto.ts
│ │ │ │── entities
│ │ │ │ ├── enfermeiro.entity.ts
│ │ │ │── enfermeiros.controller.spec.ts
│ │ │ │── enfermeiros.controller.ts
│ │ │ │── enfermeiros.module.ts
│ │ │ │── enfermeiros.service.spec.ts
│ │ │ │── enfermeiros.service.ts
│
│ │ │── medicamentos  # CRUD + catálogo ANVISA
│ │ │ │── dto
│ │ │ │ ├── create-medicamento.dto.ts
│ │ │ │ ├── update-medicamento.dto.ts
│ │ │ │── entities
│ │ │ │ ├── medicamento.entity.ts
│ │ │ │── medicamentos.controller.spec.ts
│ │ │ │── medicamentos.controller.ts
│ │ │ │── medicamentos.module.ts
│ │ │ │── medicamentos.service.spec.ts
│ │ │ │── medicamentos.service.ts
│
│ │ │── pacientes   # CRUD de pacientes
│ │ │ │── dto
│ │ │ │ ├── create-paciente.dto.ts
│ │ │ │ ├── update-paciente.dto.ts
│ │ │ │── entities
│ │ │ │ ├── paciente.entity.ts
│ │ │ │── pacientes.controller.spec.ts
│ │ │ │── pacientes.controller.ts
│ │ │ │── pacientes.module.ts
│ │ │ │── pacientes.service.spec.ts
│ │ │ │── pacientes.service.ts
│
│ │ │── prescricoes   # Prescrições + notificações em tempo real
│ │ │ │── dto
│ │ │ │ ├── create-prescricao.dto.ts
│ │ │ │ ├── update-prescricao.dto.ts
│ │ │ │── entities
│ │ │ │ ├── prescricoes.entity.ts
│ │ │ │── notifications.gateway.ts  # WebSocket (alertas em tempo real)
│ │ │ │── prescricoes.controller.spec.ts
│ │ │ │── prescricoes.controller.ts
│ │ │ │── prescricoes.module.ts
│ │ │ │── prescricoes.service.spec.ts
│ │ │ │── prescricoes.service.ts
│
│── test  # Testes end-to-end (E2E)
│ │── app.e2e-spec.ts
│ │── jest-e2e.json
│
│── .env.example
│── .gitignore
│── .prettierrc
│── eslint.config.mjs
│── medicamentos.csv  # Base ANVISA para catálogo de medicamentos
│── nest-cli.json
│── package-lock.json
│── package.json
│── prisma.config.ts
│── README.md
│── tsconfig.build.json
│── tsconfig.json
```

<br>

## 👩🏻‍💻 Autoras

#### [Elis Vieira Weiss](https://github.com/elisvw)
#### [Sarah Alves Borges](https://github.com/sarahzxwy)