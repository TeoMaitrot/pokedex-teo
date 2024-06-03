# Pokedex Téo

Cette application permet de gérer les Pokédex et les équipes de différents utilisateurs. Elle offre une interface utilisateur simple et intuitive pour créer des utilisateurs, ajouter des Pokédex, charger les données des Pokémon et afficher les informations des Pokédex et des équipes.

## Fonctionnalités

- Créer des utilisateurs
- Créer des Pokédex et les associer aux utilisateurs
- Charger les données des Pokémon à partir de l'API PokeAPI
- Afficher les Pokédex et les équipes des utilisateurs
- Ajouter et retirer des Pokémon des équipes

## Prérequis

- Node.js (version 14 ou supérieure) Assurez-vous d'avoir [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/) installés sur votre machine.
- MongoDB (version 4 ou supérieure) : Utilisez [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) pour la base de données en ligne. En théorie j'ai créé une base de donnée à laquelle vous pouvez accéder donc cette étape n'est pas forcément nécessaire
- npm (version 6 ou supérieure) : [npm](https://www.npmjs.com/) installés sur votre machine.

## Technologies utilisées

- Frontend : React, Bootstrap
- Backend : Node.js, Express, Mongoose
- Base de données : MongoDB Atlas
- API externe : [PokeAPI](https://pokeapi.co/)
- Postman pour tester mon serveur 
- GitHub et Git bash pour la gestion du dépot
- Visual Studio Code comme IDE

## Installation

### 1. Clonez le dépôt

Clonez le dépôt GitHub sur votre machine locale en utilisant la commande suivante :

1. Clonez le dépôt GitHub :
    ```sh
    git clone https://github.com/TeoMaitrot/pokedex-teo.git
    ```

2. Installez les dépendances pour le serveur backend :
    ```sh
    cd pokedex-teo/podedex
    npm install
    ```

3. Démarrez le serveur backend :
    ```sh
    npm start
    ```

4. Installez les dépendances pour le frontend :
    ```sh
    cd ../pokedex-app
    npm install
    ```

5. Démarrez l'application frontend :
    ```sh
    npm start
    ```

6. Ouvrez votre navigateur et accédez à `http://localhost:3000`.

## Architecture du Backend

Le backend de l'application est construit avec Node.js et Express, et utilise MongoDB pour la base de données. L'architecture suit le modèle MVC (Modèle-Vue-Contrôleur) pour une organisation claire et maintenable du code.

### Modèles

Les modèles définissent la structure des documents dans MongoDB. Ils sont définis à l'aide de Mongoose.

### Contrôleurs

Les contrôleurs gèrent la logique des requêtes HTTP et les interactions avec les services.

### Services

Les services contiennent la logique métier de l'application et interagissent avec les managers pour accéder aux données.

### Managers

Les managers encapsulent les opérations de base de données et sont utilisés par les services pour effectuer des opérations CRUD.

### Routes

Les routes définissent les points d'entrée de l'API et mappent les requêtes HTTP aux contrôleurs correspondants.

### Diagrammes d'architecture
1. Vous pouvez consulter le diagramme d'architecture **https://diagrams.helpful.dev/d/d:8Q1zGfwO**
2. Vous pouvez consulter le diagramme de séquence **https://diagrams.helpful.dev/d/d:BqGcnLgi**
3. Vous pouvez consulter le diagramme de classe **https://diagrams.helpful.dev/d/d:t74l1tLV**
4. A la racine du projet vous trouverez un fichier text "doc-routes-api.txt" pour voir les routes de l'API (à défaut d'avoir réussi à faire un swagger)

#### Axes d'amélioration
1. Côté serveur
C'était la première fois que j'utilisais Node et MongoDb. Je n'ai pas plus gérer comme je voulais ma récupération des données en SQL vu que j'ai fait du NoSQL. C'était plus rapide mais je maîtrisais moins ce qu'il se passait derrière.
J'aurais également du faire des tests unitaires, je n'ai pas trouver le moyen d'en implémenter pour tester au moins mes services.
Ma gestion d'erreur n'est pas bonne. Je n'ai pas personnaliser mes exceptions ce qui aurait pu être un plus. J'ai juste une classe d'exception : Error. J'ai l'habitude de personnaliser mes classes d'exceptions dans le back-end habituellement

2. Côté client
Je suis vraiment novice avec le framework React et je ne l'ai pas du tout utiliser à son plein potentiel. Mon composant gérant l'affichage des pokedexs est un anti-pattern (Objet Divin). Il aurait pu être découpé en pleins de petits composants, ce qui aurait été bcp plus simple à gérer. C'est le gros point fort de React que je n'ai pas maitrisé

#### Sources
Tout d'abord, je tiens à préciser que certaines lignes de codes ont été générées pas ChatGpt4.o Sinon j'ai utilisé : 
 - Pour créer ma base de données : **https://www.youtube.com/watch?v=NcN9S0DR1nU&pp=ygUeRGF0YWJhc2UgU2V0dXAgaSBNb25nb0RCIEF0bGFz**
 - Pour créer mon projet back : **https://rahmanfadhil.com/express-rest-api/**
 - Pour connecter ma base de données distante avec le serveur : **https://stackoverflow.com/questions/43394019/how-to-connect-to-mongodb-atlas-using-mongoose**
 - Documentation React : **https://reactjs.org/docs/getting-started.html**
 - Documentation Bootstrap : **https://getbootstrap.com/docs/5.0/getting-started/introduction/**
 - Documentation Axios : **https://axios-http.com/docs/intro**
 - Documentation Mongoose : **https://mongoosejs.com/docs/**
 - Accès à PokeApi : **https://pokeapi.co/docs/v2**
