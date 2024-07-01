## STRATEGIE DE TESTS

## Tests Unitaires

A l'ide de l'outil Jest (intégré avec Nest.js), tester que chaque composant de l'appication fonctionne comme prévu.

## Tests d'Intégration

Avec les outils Jest et Supertest (pour les requêtes HTTP), tester que les différentes composantes fonctionnent bien entre eux en utilisant une instance de test de la la Base de Données (container Docker).

## Tests de End to End (E2E) ou Bout en Bout

A l'aide des outils Jest, Supertest, vérifier que l'application se comporte comme préu dans une simulation du Monde Réel. Cela suppose une approche holistique afin de contribuer à la confiance globale dans les performances et la stabilité de l’application. Le fait de tester l'application du début jusqu'à la fin aide à identifier les problèmes liés à l'intégration dans l'application.

## Fixtures et des Seeds pour les Tests

Fixtures : Créer des données statiques pour initialiser la base de test, assurant un état de base cohérent à chaque test. One peut utiliser une librairie comme <a href="https://www.npmjs.com/package/mockingbird" rel="nofollow"><code>mockingbird</code></a> pour créer des fixtures/mocks de tests typés à l'aide de décorateurs et d'un support de falsification intégré.

Seeds : Utilisez des scripts de seeding pour peupler la base de données avec les données nécessaires avant les tests. Utiliser une librairie comme <a href="https://github.com/edwardanthony/nestjs-seeder" rel="nofollow"><code>nestjs-seeder</code></a> pour peupler la base de données de manière autimatisée.

## Créer des environnemets isolés de test avec Docker

Le fait de créer des environnemets isolés avec Docker permet de garantir que les tests sont reproductibles et cohérents sur toutes les machines. En plus, Docker permet de simplifier la configuration des environnements.

## Tests de performance

Employer des outils comme JMeter, Artillery, k6, Autocannon, AB (Apache Bench) pour réaliser des tests de charge et analyse comparative des performances, ainsi que la mise à l'échelle de l'application.

## CI/CD (Intégration Continue/Déploiement Continu)

Avec des outils comme GitLab CI ou GitHub Actions, incorporer des tests dans le pipeline de déploiement pour tester l'pplication à chaque déploiement.

## Analyse en temps réel

Des outils de surveillance comme Grafana, Prometheus, et la stack d'analyse de logs ELK Stack (Elasticsearch, Logstash, Kibana) peuvent detecter des problèmes avant qu'ils soeient ressentis par les utilisateurs de l'application.

## Tests de sécurité

En fonction de la taille de l'application et du budget, des outils comme Sonarqube (Outil open-source, détecte les bugs et les mauvaises odeurs dans le code), Snyk (cloud computing), Burp Suite (penetration testing), Nessus (scanner de vulnérabilité propriétaire), ZAP (sécurité des applications et testeur d'intrusion), Nikto (scanneur de serveur), Nmap (scanneur de réseau), Metasploit (tests d'intrusion et développement de signatures IDS), Wireshark (analyseur de paquets open source), 

## Mises à jour régulières

## Documenter les tests
