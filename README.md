<html>
<head>
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

## Rester en contact

- L'auteur de Nest.js - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Site Web - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest est [MIT license](LICENSE).

## Support

Nest est un projet open source sous licence MIT. Il peut se développer grâce aux sponsors et au soutien des incroyables bailleurs de fonds. Si vous souhaitez les rejoindre, n'hésitez pas [en savoir plus ici](https://docs.nestjs.com/support).

## Priére de lire ce document jusqu'à la fin

## Installation

```bash
$ npm install
```

## Ajouter le ficher ".env" à la racine du projet avec le contenu suivant. Important ! Pensez à mettre un mot de passe plus sécurisé et des SECRETs complexes et plus longs, surtout pour la Prod.
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/nestjs?schema=public"
AT_SECRET="at-secret"
RT_SECRET="rt-secret"
```

## Installer Docker, si vous ne l'avez pas
```bash
https://docs.docker.com/engine/install/
```

## Démarrer la Base de Données (voir le ficher docker-compose.yml à la racine du projet) :
```bash
$ docker-compose up
```

## Générer les tables de la Base de Données à l'aide de Prisma, "migration". Dans l'option qui va être demandée, nommer la migration, e.g. "init" :
```bash
$ npx prisma migrate dev --create-only
```

## Ouvrir l'outil de gestion de Base de Données "Prisma Studio" dans le navigateur
```bash
$ npx prisma studio
```

## Démarrer l'application
```bash
# Mode auto-redemarrage 
$ npm start

# Mode production
$ npm run start:prod
```

## Test

```bash
# Tests uniters
$ npm run test

# Tests bout-en-bout
$ npm run test:e2e

# Couverture de tests
$ npm run test:cov
```

## Désinstaller Nest.js, Prisma et PostgreSQL

## Supprimer le code source du projet sur Windows

<tt>Séléctionner le répertoire qui contient le projet et appuyer sur "Maj + Suppr"</tt>

## Supprimer le code source du projet sur les appareils avec un système Unix, en ligne de commande
```bash
$ rm -rf /chemin/vers/votre/projet
```

## Supprimer la base de données depuis Docker, mais également en cas de redémarrage de Docker :
```bash
$ docker-compose down --volumes
```

## Supprimmer Nest.js :
```bash
$ npm uninstall -g @nestjs/cli
```

## Supprimmer Prisma :
```bash
$ npm uninstall -g prisma
```

## Désinstaller PostgreSQL en ligne de commande
```bash
# Sous macOS (utilisant Homebrew) :
$ brew uninstall postgresql
$ brew cleanup
$ rm -rf /usr/local/var/postgres
$ rm -f /usr/local/bin/psql /usr/local/bin/createdb

# Sous Ubuntu :
$ sudo apt-get --purge remove postgresql postgresql-client postgresql-client-common postgresql-common
$ sudo apt-get autoremove
$ sudo apt-get autoclean
$ sudo rm -rf /etc/postgresql /var/lib/postgresql /usr/lib/postgresql
```

# Supprimer Postgres d'une machine Windows :
<tt>Désinstaller PostgreSQL via le Panneau de configuration :<br/>
<br/>
Allez dans "Panneau de configuration" -> "Programmes" -> "Programmes et fonctionnalités".<br/>
Trouvez PostgreSQL dans la liste, cliquez dessus, puis cliquez sur "Désinstaller".<br/>
Supprimer les fichiers restants :<br/>
<br/>
Supprimez le répertoire d'installation de PostgreSQL, généralement situé dans C:\Program Files\PostgreSQL.<br/>
Supprimez les données PostgreSQL, généralement situées dans C:\Program Files\PostgreSQL\<version>\data.<br/>
Supprimer les variables d'environnement :<br/>
<br/>
Ouvrez le menu Démarrer, recherchez "variables d'environnement" et sélectionnez "Modifier les variables d'environnement<br/> système".
Dans la section "Variables système", trouvez et supprimez les variables liées à PostgreSQL (PGDATA, PGHOME, etc.).</tt>

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
<tt>                                                                            </tt><br/>
<tt>                                                    Enregistrer le          </tt><br/>
<tt>                                                    hash du refresh token   </tt><br/>
<tt>   +--------+     auth/login        +--------+                              </tt><br/>
<tt>   |        |  -------------------> |        | \       ______               </tt><br/>
<tt>   | Client |                       | Server |  \     /      \              </tt><br/>
<tt>   |        | <-------------------  |        |   \   |\______/|             </tt><br/>
<tt>   +--------+     access_token      +--------+    \  |        |             </tt><br/>
<tt>                  refresh_token                   _\||   DB   |             </tt><br/>
<tt>                                                     |        |             </tt><br/>
<tt>                                                     |________|             </tt><br/>
<tt>                                                                            </tt><br/>
<tt>                                                    Comparer le hash avec   </tt><br/>
<tt>                                                    le refresh token        </tt><br/>
<tt>   +--------+     auth/refresh      +--------+                              </tt><br/>
<tt>   |        |  -------------------> |        | \       ______               </tt><br/>
<tt>   | Client |                       | Server |  \     /      \              </tt><br/>
<tt>   |        | <-------------------  |        |   \   |\______/|             </tt><br/>
<tt>   +--------+     access_token      +--------+    \  |        |             </tt><br/>
<tt>                  refresh_token                   _\||   DB   |             </tt><br/>
<tt>                                                     |        |             </tt><br/>
<tt>                                                     |________|             </tt><br/>
<tt>                                                                            </tt><br/>
<tt>                                                    Supprimer le hash du    </tt><br/>
<tt>                                                    refresh token de la BD  </tt><br/>
<tt>   +--------+     auth/logout       +--------+                              </tt><br/>
<tt>   |        |  -------------------> |        | \       ______               </tt><br/>
<tt>   | Client |                       | Server |  \     /      \              </tt><br/>
<tt>   |        | <-------------------  |        |   \   |\______/|             </tt><br/>
<tt>   +--------+          204          +--------+    \  |        |             </tt><br/>
<tt>                                                  _\||   DB   |             </tt><br/>
<tt>                                                     |        |             </tt><br/>
<tt>                                                     |________|             </tt><br/>
<tt>                                                                            </tt><br/>
<tt>                                                                            </tt><br/>
<tt>   Si le refresh token a été corrompu/vlolé                                 </tt><br/>
<tt>   on le supprime manuellement depuis la BD.                                </tt><br/>
<tt>            ______                                                          </tt><br/>
<tt>           /      \                                                         </tt><br/>
<tt>          |\______/|                                                        </tt><br/>
<tt>          |        |                                                        </tt><br/>
<tt>          |   DB   |                                                        </tt><br/>
<tt>          |        |                                                        </tt><br/>
<tt>          |________|                                                        </tt><br/>
<tt>                                                                            </tt><br/>
<tt>                                                                            </tt><br/>
<br/><br/><br/>
SOURCES :
<br/><br/>
JWT access and refresh tokens :
<br/>
https://github.com/vladwulf/nestjs-jwts/tree/main
<br/>
https://www.youtube.com/watch?v=uAKzFhE3rxU
<br/><br/>
RBAC (Role-based access control) :
<br/>
https://www.youtube.com/watch?v=Um9wyVaB5Iw
<br/>
https://medium.com/@dev.muhammet.ozen/role-based-access-control-in-nestjs-15c15090e47d
<br/><br/>
</body>
<html>