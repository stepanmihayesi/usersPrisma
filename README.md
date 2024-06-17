<html>
<head>
<title>ASCI</title>
<style>
  body {
    font-family: 'Fira Code', Consolas, 'Courier New', monospace;
}
pre, code {
    font-family: inherit;
}
</style>
</head>
<body>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

<br/>
Fonctionnalité :
<br/>
- L'utilisateur peut se connecter avec succès
<br/>
- L'utilisateur obtient 403 sur des informations d'identification non valides
<br/>
- L'utilisateur obtient 401 sur le jeton expiré
<br/>
- L'utilisateur peut actualiser le jeton d'accès à l'aide du jeton d'actualisation
<br/>
- L'utilisateur ne peut utiliser le jeton d'actualisation qu'une seule fois
<br/>
- Les jetons d'actualisation deviennent invalides à la déconnexion
<br/>
- Plusieurs jetons d'actualisation sont valides (l'utilisateur peut se connecter à partir de différents appareils)
<br/>

<br/>
Functionality :

<br/>
- User can successfully login

<br/>
- User gets 403 on invalid credentials

<br/>
- User gets 401 on expired token

<br/>
- User can refresh access token using refresh token

<br/>
- User can use refresh token only once

<br/>
- Refresh tokens become invalid on logout

<br/>
- Multiple refresh tokens are valid (the user cans connect from differet devices)
```````````````````````````````````````````````````````````````````````````````````````````<br/>
```````````````````````````````````````````````````````````````````````````````````````````<br/>
`````+--------+`````auth/login````````+--------+``Save`hash`of`refresh`token```````````````<br/>
`````|````````|``------------------->`|````````|`\```````______````````````````````````````<br/>
`````|`Client`|```````````````````````|`Server`|``\`````/``````\```````````````````````````<br/>
`````|````````|`<-------------------``|````````|```\```|\______/|``````````````````````````<br/>
`````+--------+`````access_token``````+--------+````\``|````````|``````````````````````````<br/>
````````````````````refresh_token```````````````````_\||```DB```|``````````````````````````<br/>
```````````````````````````````````````````````````````|````````|``````````````````````````<br/>
```````````````````````````````````````````````````````|________|``````````````````````````<br/>
```````````````````````````````````````````````````````````````````````````````````````````<br/>
```````````````````````````````````````````````````````````````````````````````````````````<br/>
`````+--------+`````auth/refresh``````+--------+``Compare`hash`to`refresh`token````````````<br/>
`````|````````|``------------------->`|````````|`\```````______````````````````````````````<br/>
`````|`Client`|```````````````````````|`Server`|``\`````/``````\```````````````````````````<br/>
`````|````````|`<-------------------``|````````|```\```|\______/|``````````````````````````<br/>
`````+--------+`````access_token``````+--------+````\``|````````|``````````````````````````<br/>
````````````````````refresh_token```````````````````_\||```DB```|``````````````````````````<br/>
```````````````````````````````````````````````````````|````````|``````````````````````````<br/>
```````````````````````````````````````````````````````|________|``````````````````````````<br/>
```````````````````````````````````````````````````````````````````````````````````````````<br/>
```````````````````````````````````````````````````````````````````````````````````````````<br/>
`````+--------+`````auth/logout```````+--------+``Delete`hash`of`refresh`token`from`DB`````<br/>
`````|````````|``------------------->`|````````|`\```````______````````````````````````````<br/>
`````|`Client`|```````````````````````|`Server`|``\`````/``````\```````````````````````````<br/>
`````|````````|`<-------------------``|````````|```\```|\______/|``````````````````````````<br/>
`````+--------+``````````204``````````+--------+````\``|````````|``````````````````````````<br/>
````````````````````````````````````````````````````_\||```DB```|``````````````````````````<br/>
```````````````````````````````````````````````````````|````````|``````````````````````````<br/>
```````````````````````````````````````````````````````|________|``````````````````````````<br/>
```````````````````````````````````````````````````````````````````````````````````````````<br/>
```````````````````````````````````````````````````````````````````````````````````````````<br/>
`````If`refresh`token`is`stolen````````````````````````````````````````````````````````````<br/>
`````````````manual`delete`of`RT`hash`from`DB.`````````````````````````````````````````````<br/>
``````````````______```````````````````````````````````````````````````````````````````````<br/>
`````````````/``````\``````````````````````````````````````````````````````````````````````<br/>
````````````|\______/|`````````````````````````````````````````````````````````````````````<br/>
````````````|````````|`````````````````````````````````````````````````````````````````````<br/>
````````````|```DB```|`````````````````````````````````````````````````````````````````````<br/>
````````````|````````|`````````````````````````````````````````````````````````````````````<br/>
````````````|________|`````````````````````````````````````````````````````````````````````<br/>
```````````````````````````````````````````````````````````````````````````````````````````<br/>
```````````````````````````````````````````````````````````````````````````````````````````<br/>
```````````````````````````````````````````````````````````````````````````````````````````<br/>
</body>
<html>