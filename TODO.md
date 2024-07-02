## Elements manquants

- Vérification de mail avec un lien à utilisation unique (champ prévu dans la table "users").
- Utiliser des GUIDs au lieu d'IDs pour la table utilisateurs.
- Authentification à deux facteurs.
- Paseto token, si je referais le projet à nouveau (https://medium.com/@shikharawasthi963/difference-between-json-web-token-and-paseto-5f3b2101fae7).
- Diminuer la durée de vie de l'Access Token et la combiner avec une fonctionnalité de requètes repetitives à interval régulier (setInterval) et sauvegarder les tokens dans un cookie httpOnly.
- Containeriser l'application pour une meilleure mise à l'échelle et un déploiement plus facile.
- Tests unitaires, tests d'intégration et tests Bout-en-Bout (E2E) complets.
- Utiliser des mocks pour les services et les modules externes.
- Mise en place d'un système de cache (ex. Redis) afin d'améliorer les performances et réduire la charge sur la base de données.
- Système de logging (Winston ou Pino) (https://medium.com/@muniraweb/choosing-the-right-logging-framework-for-your-node-js-application-winston-vs-pino-31ee720ab7ee).
- Utilisez Swagger pour générer une documentation interactive.
- Commenter pour mieux décrire les fonctionnalités des endpoints.
- Nodemon pourrait être abandonné au profit de watch mode introdiut dans Node.js v18.11.0. Par contre, comme on utilise config et le projet peut augmenter en taille et l'arborescence des repertoires/fichiers peut inclure des fichiers qui ne nécessitent pas une ecoute, c'est peut-etre mieux de garder Nodemon. Surtout, la configuration actuelle marche pour le Dev et la Prod. (https://medium.com/@moaidmoaidrazhy/node-watch-vs-nodemon-4c8f0fc8a1af)
- Les filtres, surtout sur les dates "createdAt" et "updatedAt" peuvent et doivent être améliorés.
- Une librairie pour une gestion de Rôles plus avancée peut être utilisée comme, par exemple https://github.com/nestjsx/nest-access-control.
- Les DTOs du répertoire ./shared/dto n'ont pas vraiment tous besoin d'etre partagés entre les modules et peuvent être séparés et déplacés dans vers les modules correspondants.
- Configurer Prettier pour qu'il rentre en action à la sauvegarde (Ctrl+s).
- Drizzle pourrait être utilisé à la place de Prisma si on estimait d'avoir besoin d'un "query builder" traditionnel. Par contre, dans ce cas, il faut accepter le fait que Drizzle n'est pas "fully type safe".