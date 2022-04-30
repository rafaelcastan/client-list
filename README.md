## Getting Started

A aplicação pode ser iniciada em modo de desenvolvedor com: 

```bash
npm run dev
# or
yarn dev
```

Os testes podem ser observados com o comando:

```bash
npm test
# or
yarn test
```

## About the app


### A aplicação utiliza : 

[ReactJs](https://pt-br.reactjs.org/) como framework.

[Typescript](https://www.typescriptlang.org/) para facilitar a legibilidade e manutenção do código.

[ChrakraUI](https://chakra-ui.com/) para criar a User Interface.

[Axios](https://github.com/axios/axios) para requisições api.

[react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api) para exibir o mapa.

[Jest](https://jestjs.io/pt-BR/) para a integração de testes unitários.



## File organization

Como o ChrakraUI acaba por deixar o código muito extenso, o código foi quebrado em pequenos componentes para facilitar a legibilidade e manutenção do mesmo.



## Observations

É nescessário criar um arquivo .env.local contendo a chave API do google maps para que o mapa funcione.

Ex: REACT_APP_GMAP_KEY = 'CHAVEAPI'.



## Preview

Você pode visualizar a aplicação funcionando clicando no link abaixo:

[Preview](https://client-list-three.vercel.app/)