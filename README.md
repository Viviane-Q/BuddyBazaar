# Documentation du projet

# Objectifs du projets
TODO : à compléter


# Démo 
(screencast)
TODO : à faire

# Installation et exécution des tests
Voir dans les README du frontend et du backend.

# Documentation de l'API
cf. le swagger

# Architecture
## Frontend
TODO : à compléter

## Backend
### Description
L'architecture du backend est largement inspirée de l'architecture hexagonale. Le but principale d'une telle architecture est de concevoir un logiciel modulable, testable et indépendant des systèmes externes (frameworks, UI, BDD, etc.). Pour cela on se repose notemment sur les principes SOLID.

TODO : schéma

#### 1. Domain
Le _domain_ contient les _entities_, c'est-à-dire le modèle des données qu'on va manipuler et les _interfaces_ qui définissent les contrats d'utilisation des systèmes externes.

- Entities :
TODO : faire un diagramme de classe

- Interfaces : 
    - repositories : accès aux tables de la base de données
    - services divers (chiffrage, etc.)

#### 2. Core
Le _core_ contient le coeur de l'application, là où se trouve toute la logique métier. Elle est isolée des dépendances externes et est donc plus facilement testable. Elle est découpée en _use cases_ (cas d'usage) et chacun d'eux représente une fonctionnalité. Le paramétrage se fait via les _entities_ du métier qui vont être manipulés et les _interfaces_ qui permettent de changer d'implémentation en fonction du besoin (par exemple, utiliser des inMemory ou fake lors des tests).

- Use cases :
    - RegisterUser : Inscrire un utilisateur
    - SignInUser : Connecter un utilisateur

#### 3. Adaters
Les _adapters_ contient les implémentations répondant aux contrats d'utilisation (_interfaces_) du coeur de notre application.
Il existe deux catégories d'_adapters_ :
- Driving : c'est ce qui réunit les points d'entrée d'une application. Donc on y retrouve dans notre cas les _routes_ de notre API et les _controllers_. Les _interfaces_ de ce cas ne sont pas définit concrètement mais on peut les voir comme les signatures des _use case_. 
- Driven : ce sont les _adapters_ qui seront utilisés par l'application. On y retrouve donc l'accès à la base de données ou encore l'usage de bibliothèques externes.

### Testabilité
#### 1. Tests unitaires (spec)
La portée de ces tests ne s'arrête qu'au use cases (donc une fonctionnalité), c'est pour cela qu'on substitue les implémentations concrètes par des fakes. Leur objectif est de documenter les comportements métiers de notre application à travers des exemples de scénarios. Ils sont aussi indépendants des uns des autres et sont donc exécutables en parallèle.

#### 2. Tests d'intégration
Ces tests ont simplement pour objectif de vérifier que les adapters respectent les contrats définis dans l'application. Donc on va faire appel ici à une vraie base de données et aux services réels pour les driven adapters. Dans le cas des driving adapters, les tests API permet de vérifier que nos controllers passent les bonnes informations à nos use cases.

TODO : à faire sur des repos plus complexes

#### 3. Tests end-to-end (e2e)
Comme l'indique le nom, ce sont des tests bout en bout qui vérifient que l'API du backend retourne bien ce qui est attendu et qui passent donc à travers toutes les couches de l'architecture. Dans notre cas, la couverture est faite via les tests API.

### Gestion des utilisateurs

### Webservices utilisés
