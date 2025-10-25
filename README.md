# Stone Hoops League 

![Stone Hoops Logo](/public/images/stone.png) Bienvenue sur le dépôt du site web officiel de la **Stone Hoops League**, une ligue de basketball professionnelle fictive. Ce projet a été réalisé dans le cadre du test technique de **Tailoring Sports Investments (TSI)**.

**Lien vers la Démo Live :** [(https://stone-hoops.netlify.app/)]

## Objectif

Créer une expérience web moderne, engageante et informative pour les fans de basketball, en simulant le développement d'un site pour une organisation sportive.

## Fonctionnalités Implémentées

* **Gestion des Équipes :** Affichage de la liste des équipes et page de détails avec l'effectif (roster).
* **Calendrier & Résultats :** Sections distinctes pour les matchs à venir et les résultats récents.
* **Classement :** Tableau de classement de la ligue.
* **Design Responsive :** Interface adaptée aux mobiles, tablettes et ordinateurs de bureau.
* **Mode Sombre/Clair :** Basculement de thème avec persistance du choix utilisateur (`next-themes`).
* **Indicateurs de Chargement :** Affichage d'un spinner animé global pendant la récupération des données (`loading.tsx`).
* **(Bonus) Visualisation de Données :** Graphique à barres pour les classements (via `Recharts`).
* **(Bonus) Export de Données :** Bouton pour exporter le classement au format CSV.

## Stack Technique

* **Framework :** Next.js 14+ (App Router)
* **Langage :** TypeScript (Strict Mode)
* **Styling :** Tailwind CSS (v4)
* **Qualité du Code :** ESLint & Prettier
* **Gestion du Thème :** `next-themes`
* **API de Données :** AllSportsAPI (Basketball) - *Utilisée avec des données mock pour les effectifs.*
* **Graphiques :** Recharts

## Instructions d'Installation

1.  **Cloner le dépôt :**
    ```bash
    git clone [https://github.com/stonefadel02/stone-hoops.git]
    cd stone-hoops
    ```

2.  **Installer les dépendances :**
    ```bash
    npm install
    # ou yarn install ou pnpm install
    ```

3.  **Configurer les variables d'environnement :**
    * Créez un fichier `.env.local` à la racine du projet.
    * Ajoutez votre clé API AllSportsAPI :
        ```env
        API_KEY=VOTRE_CLE_API_ALLSPORTSAPI_ICI
        ```

## Guide de Démarrage

Pour lancer le serveur local :

```bash
npm run dev
# ou yarn dev ou pnpm dev
# stone-hoops