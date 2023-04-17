## Cahier des charges

1. Créer l'API pour notre site web
    - Register/Login (Prof/Etudiant)
    - Profil
    - Créer/Modifier/Supprimer un cours(Prof)
    - Créer/Modifier/Supprimer une matière(admin)
    - Rejoindre un cours(Etudiant)
    - Search Bar pour trouver un prof ou une matière 
2. Créer la base de données sur MongoDB et la lier au projet
2. Design du site
4. Créer le Front du site web
5. Lier le back et le front du site web
6. Déployer le site web sur AWS

Cahier des charges pour la création d'une API pour un site web de cours particuliers

## 1. Introduction

Présentation du contexte et des objectifs du projet:
Notre projet consiste à créer un site web qui permettra aux étudiants de s'inscrire à des cours particuliers donnés par des professeurs. Nous souhaitons créer une API pour gérer toutes les fonctionnalités du site. L'objectif est de fournir un service de qualité aux étudiants et aux professeurs pour améliorer leur expérience d'enseignement/apprentissage.

Description générale du produit ou service attendu:
Le site web permettra aux étudiants de rechercher des professeurs pour des cours particuliers dans une variété de matières. Les professeurs pourront créer, modifier et supprimer des cours, tandis que les étudiants pourront rejoindre des cours existants et gérer leur profil. Nous prévoyons également de fournir un système de paiement en ligne pour les cours particuliers.

Portée du projet:
La portée de ce projet est de créer une API qui fournira toutes les fonctionnalités nécessaires pour gérer les cours particuliers entre les étudiants et les professeurs. Nous ne prévoyons pas de créer l'interface utilisateur, mais plutôt de fournir une API sécurisée et bien documentée qui sera utilisée pour développer l'interface utilisateur.

## 2. Objectifs et contraintes

Objectifs spécifiques et mesurables à atteindre:
    - Créer une API sécurisée pour la gestion des cours particuliers
    - Permettre aux professeurs de créer, modifier et supprimer des cours
    - Permettre aux étudiants de rejoindre des cours existants et gérer leur profil
    - Permettre aux utilisateurs de rechercher des professeurs par matière
    - Intégrer un système de paiement en ligne pour les cours particuliers( bonus)
Contraintes techniques, budgétaires, temporelles et réglementaires:
    - Utiliser MongoDB comme base de données pour stocker les informations des utilisateurs et des cours
    - Respecter les normes de sécurité pour protéger les données sensibles des utilisateurs
    - Respecter le budget et les délais du projet
    - Respecter les réglementations en matière de protection des données personnelles

## 3. Besoins des utilisateurs

Identification des parties prenantes et des utilisateurs finaux:
    - Parties prenantes: Administrateurs, Professeurs et Étudiants
    - Utilisateurs finaux: Étudiants et Professeurs
Description des besoins et des attentes de chaque groupe d'utilisateurs:
    - Administrateurs: Besoin de gérer les matières et les utilisateurs
    - Professeurs: Besoin de créer, modifier et supprimer des cours particuliers, de gérer leur profil et d'être payé pour leurs services
    - Étudiants: Besoin de rejoindre des cours particuliers existants, de gérer leur profil et de payer pour les services de cours particuliers
Scénarios d'utilisation et cas d'usage:
    - Un professeur veut créer un nouveau cours particulier dans une matière donnée
    - Un étudiant veut rejoindre un cours particulier existant
    - Un administrateur veut ajouter une nouvelle matière à la base de données

## 4. Exigences non fonctionnelles

Performances et temps de réponse

    - L'API doit être capable de gérer un grand nombre de requêtes simultanées sans baisse de performances.
    - Le temps de réponse maximal pour une requête doit être inférieur à 500ms.

Sécurité et confidentialité

    - Les données des utilisateurs doivent être stockées de manière sécurisée.
    - L'accès à certaines fonctionnalités doit être restreint en fonction du type d'utilisateur.
    - Les mots de passe doivent être stockés de manière sécurisée en utilisant des algorithmes de hashage.
    - Les communications entre l'API et le front-end doivent être 
    chiffrées à l'aide de protocoles de sécurité tels que SSL/TLS.

Ergonomie et accessibilité

    - L'interface utilisateur doit être ergonomique et intuitive pour une utilisation facile.
    - Le site doit être accessible aux personnes en situation de handicap conformément aux normes en vigueur.

Evolutivité et maintenabilité

    - L'API doit être facilement extensible pour ajouter de nouvelles fonctionnalités.
    - Le code doit être bien structuré et documenté pour faciliter la maintenance.

## 5. Architecture et conception

Nous utiliserons Node.js comme environnement d'exécution pour notre API.
Nous utiliserons Express.js comme framework pour construire notre API.
La base de données sera MongoDB, une base de données NoSQL.
Nous utiliserons Mongoose, une bibliothèque de modélisation de MongoDB pour la communication avec la base de données.
Nous utiliserons des outils tels que Postman pour tester l'API pendant le développement.
Pour le front-end, nous utiliserons des technologies telles que React.js, HTML, CSS et JavaScript.
Les maquettes et prototypes seront réalisées à l'aide d'outils tels que Sketch ou Figma.

## 6. Planification et organisation
Phase 1: Conception et Planification (2 jours)
Phase 2: Développement Backend (2 semaines)
Phase 3: Développement Frontend (2 semaines)
Phase 4: Tests et Déploiement (1 semaines)

## 7. Méthodologie et gestion de projet
Nous utiliserons la méthodologie Agile pour le développement de notre projet.
Nous utiliserons des outils tels que Trello pour la gestion des tâches et la communication entre les membres de l'équipe.
Nous aurons des réunions hebdomadaires pour faire le point sur l'avancement du projet et identifier les problèmes à résoudre.

## 8. Livrables et critères d'acceptation
Documentation technique détaillée
Code source de l'API et du front-end
Tests unitaires et fonctionnels
Site web fonctionnel et déployé sur AWS

## 9. Annexes
Glossaire des termes techniques
Références et sources d'information
Liste des outils et technologies utilisés.
