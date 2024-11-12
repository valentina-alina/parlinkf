# ParLink

## Description
Cette application a été développée au cours d'une formation de 5 mois par immersion en entreprise. Elle été conçu et développée  de A à Z, du concept jusqu'à la mise en ligne en équipe de trois personnes en mode Agile.
L'application vise à créer un réseau social entre les parents des enfants de la même école, facilitant les sorties en groupe, le covoiturage, l'échange de jeux et les rencontres amicales.
Cette plateforme ambitionne de redonner vie à la communauté parentale, permettant aux enfants de retrouver un espace d'épanouissement et de convivialité en dehors des cadres formels de l'école. 
Conformément aux technologies enseignées lors de la formation, nous avons choisi d'utiliser une architecture logiciel de type hybride. 
La partie front end a été développée en **ReactJS** et **Flowbite** comme framework UI. Le back end a été développé en **NestJS**, séparément du front. Le projet utilise une base de données en **SQL** et **l’ORM Prisma**. Pour répondre aux exigences du référentiel métier, nous avons d'abord établi un cahier des charges, nous avons modélisé la base de données et maquetté l'interface graphique avec **Figma.** Par la suite, nous avons sélectionné l'architecture logicielle, les technologies associées, et nous avons établi le backlog de tâches à réaliser. Concernant le développement du code, nous avons d'abord développé le front end en mode simulation en utilisant des données factices (fakers). Nous avons ensuite développé le back end en mode simulation et réalisé des tests avec **Postman et Swagger.** Enfin, nous avons procédé au câblage, c'est-à-dire à la connexion entre le front end et le back end. Nous avons intégré des tests de bout en bout (end-to-end) avec **Cypress** et des tests d’intégration avec Postman. Nous avons travaillé en mode conteneurisé avec **Docker,** tant en développement qu'en production, et nous avons essayé d'adapter l'application web (initialement responsive) pour en faire une application mobile en utilisant **Capacitor.**

## Fonctionnalités

- **Création et gestion des utilisateurs
- **Création et gestion de son profil utilisateur** (en cours)
- **Création et gestion des annonces et évènements**
- **flux de commentaires** (en cours) 
- **Chat utilisateurs** (en cours)

# Technologies utilisées

## Front-End

### Technologies Utilisées :
- **React TypeScript (ReactTS)** : Gestion de la logique du Front-end.
- **Flowbite** : Framework UI pour construire des interfaces utilisateur modernes.
- **Formik** : Gestion des formulaires, simplifiant la collecte des données utilisateur.
- **Yup** : Validation des formulaires, assurant que les données saisies respectent les règles définies.
- **LocalStorage** : Stockage des tokens JWT, utilisés pour l'authentification, directement dans le navigateur pour les sessions utilisateurs.

### Test
- **Cypress** : Outil de test end-to-end pour les applications web.

### Communication avec le Back-End
- **Axios** : Utilisé pour envoyer des requêtes HTTP au Back-end (souvent avec le JWT dans l'en-tête pour l'authentification).

## Back-End
L'architecture backend du projet est de type monolithique. Bien qu'une approche hybride intégrant des microservices ait été envisagée, des contraintes de temps ont conduit à maintenir cette structure pour l'instant. Une transition vers une architecture hybride, voire de type microservices, est envisagée pour la version 2.

### Technologies Utilisées :
- **NestJS** : Framework principal pour la logique serveur et les API.
- **Prisma ORM** : Gestion des interactions avec la base de données MariaDB.
- **JWT (JSON Web Token)** : Utilisé pour l'authentification sécurisée des utilisateurs. Les tokens sont vérifiés par le Back-end pour autoriser l'accès aux différentes routes et fonctionnalités.
- **Redis** : Utilisé pour le cache, permettant de stocker temporairement des données souvent consultées, réduisant les temps de réponse et la charge sur la base de données.

### Test
- **Swagger** : Un outil utilisé pour documenter, concevoir et tester des API REST, avec une interface interactive pour tester les endpoints directement.
- **Postman** : Application pour tester, automatiser et déboguer les API, offrant une interface intuitive pour envoyer des requêtes HTTP et voir les réponses.

### Communication avec la Base de Données
- Le Back-end utilise **Prisma** pour interagir avec MariaDB, en exécutant des requêtes SQL sécurisées.
- **Redis** est utilisé pour stocker des données en cache, accélérant les opérations fréquentes et améliorant les performances globales de l'application.

## Base de Données
La base de données utilisée actuellement dans le projet ParLink (version v1) est **MariaDB**. Une version v2 du projet, avec une architecture hybride voire entièrement de type micro-service, et une base de données de type NoSQL est envisagée.

### Détails de la Base de Données :
- **Type de Base de Données** : MariaDB, une base de données SQL relationnelle.
- **Accès aux données** : Géré par **Prisma ORM**, qui génère les requêtes SQL en fonction des modèles définis dans le Back-end.

## Schéma de l’Architecture Logicielle

![image](https://github.com/user-attachments/assets/716bbd29-0100-4b02-bfd7-920537a3e2df)

### Résumé des Technologies
- **HTTP / HTTPS** : Communication sécurisée entre le front-end et le back-end.
- **Query Engine** : Exécution des requêtes via Prisma et SQL.
- **Data** : Stockage et gestion des données avec SQL.


## env

````bash

WORK_DIR=/usr/<APP_ROOT>
VITE_API_BASE_URL='http://<IPV4_ADDRESS>:<APP_PORT>/'
````
