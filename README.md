# Projeto Flashcards Móveis

Este projeto atende ao terceiro modulo do **Programa Nanodegree - Desenvolvimento React** da Udacity.

## Objetivo

Criar um aplicativo para dispositivos móveis (Android ou iOS - ou ambos) que permite que usuários estudem uma coleção de flashcards. Com o app, os usuários poderão criar diferentes categorias de flashcards chamadas de "baralhos", adicionar flashcards a esses baralhos, e fazer os quizes nestes baralhos.

## Especificação do projeto:

#### Configuração do Projeto
A aplicação foi criada com o create-react-app, após a aplicação criada entrar dentro do projeto gerado e digitar o comando npm install para instalar todas as dependência necessárias e após, digitar **expo start** para que a aplicação seja iniciada.<br />

####  Página principal 
A página principal lista todos os cards (baralho) que foram criados, caso não tenha sido criado poderá ser feito ao clicar em adcionar baralho, caso já tenha sido criado pode-se clicar no card é o mesmo será direcionado para uma outra pagina.

#### Página do Card - Formulário basico de cadastro de quiz e perguntas

está pagina contem o nome do card , nº de baralho(s) bem como os botões para o quiz e as perguntas a serem eleboradas.

Ao tentar criar um quiz sem perguntas já digitadas será apresentada uma mensagem informando que não a perguntas eleboradas.

1)Quiz<br />
2)Perguntas<br />

####  Página de Perguntas - Formulário basico de cadastro contendo as seguintes informações

A pergunta contem o nº da pergunta com a sua respectiva pergunta e resposta, após a confirmação da pergunta, poderá ser criada outra pergunta automaticamente.

1)Informar a Pergunta<br />
2)Informar a Resposta<br />

####  Página de Quiz - Formulário basico de cadastro contendo as seguintes informações

A tela do quiz mostra quantas perguntas serão feitas, bem como o controle delas. A pergunta será apresentada e poderá confirmar se está **correta** ou **incorreta** ou ainda clicar na resposta para ser visualizada.

Após responder todas as perguntas será enviada para um formulário que informara a quantidade de questões feitas.

Solicitara ainda o inicio de um **novo quiz** ou o retorno para a tela de **listagem dos cards**.

####  Evento de Notificação 

O app controla o agendamento do dia, ou seja,  caso não haja nenhum quiz feito no dia o app enviara uma notificação informando que não foi feito um quiz no dia.

#### Lembrete:

* Para a instalação das dependência do projeto é necessário está dentro da pasta do projeto e digitar `npm install`

* Para executar a aplicação: `expo start`

* Esse App foi testado na plataforma Android (Motorolla G4 Plus)

## O Projeto FlashCards oferece a seguinte estrutura:
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.    
    ├── actions # são fontes de informações que são enviadas da aplicação para a Store. São disparadas pelas Action Creators, que são simples funções que, ao serem executadas, ativam os Reducers.
        ├── cards # Informações da store  do cards
    ├── componentes # Pasta utilizada para organizar as funcionalidades do projeto
        ├── Card # layout da pagina de card
        ├── Cardnumber # layout da pagina de criação do quiz / Pergunta
        ├── Footer # layout da pagina de Footer
        ├── ListagemCard # layout de listagem dos cards
        ├── Montagem # componente que faz a interligação da Listagem de Card / footer.
        ├── PerguntaCard # componente que cria a Pergunta.
        ├── QuizCard # componente que cria o Quiz.
        ├── Storage # componente que gerencia as informações da Notificação e Storage.
    ├── reducers # recebem e tratam as informações para que sejam (ou não) enviadas à Store.
    ├── store # é o container que armazena e centraliza o estado geral da aplicação. Ela é imutável, ou seja, nunca se altera, apenas evolui.
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
    
```

## Create React Native App

Este projeto foi inicializado com o [Create React Native App](https://github.com/react-community/create-react-native-app). Você pode encontrar mais informações sobre como executar tarefas comuns [aqui](https://github.com/react-community/create-react-native-app).

## Contribuição

Esté repositório é para atender os alunos da Udacity
para maiores detalhes, clique aqui [CONTRIBUTING.md](CONTRIBUTING.md).