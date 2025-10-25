Stone Hoops League - Site Web Officiel


Bienvenue sur le dépôt du site web officiel de la Stone Hoops League, une ligue de basketball professionnelle fictive réalisé dans le cadre du test technique de Tailoring Sports Investments (TSI).

Lien vers la Démo Live : [À AJOUTER - URL Vercel/Netlify]

Objectif

Créer une expérience web moderne, engageante et informative pour les fans de basketball, en simulant le développement d'un site pour une organisation sportive.

Fonctionnalités Implémentées

Gestion des Équipes : Affichage de la liste des équipes et page de détails avec l'effectif (roster).

Calendrier & Résultats : Sections distinctes pour les matchs à venir et les résultats récents.

Classement : Tableau de classement de la ligue.

Recherche Globale : Barre de recherche permettant de trouver des équipes.

Design Responsive : Interface adaptée aux mobiles, tablettes et ordinateurs de bureau.

Mode Sombre/Clair : Basculement de thème avec persistance du choix utilisateur.

Indicateurs de Chargement : Affichage d'un spinner pendant la récupération des données.

(Bonus) Visualisation de Données : Graphique des classements (si implémenté).

(Bonus) Export de Données : Bouton pour exporter le classement en CSV (si implémenté).

Stack Technique

Framework : Next.js 14+ (App Router)

Langage : TypeScript (Strict Mode)

Styling : Tailwind CSS (v4)

Qualité du Code : ESLint & Prettier

Gestion du Thème : next-themes

API de Données : AllSportsAPI (Basketball)

(Optionnel) Graphiques : Recharts

Instructions d'Installation

Cloner le dépôt :

git clone [URL_DE_VOTRE_DEPOT_GIT]
cd stone-hoops 


Installer les dépendances :

npm install
# ou yarn install ou pnpm install


Configurer les variables d'environnement :

Créez un fichier .env.local à la racine du projet.

Ajoutez votre clé API AllSportsAPI :

API_KEY=VOTRE_CLE_API_ALLSPORTSAPI_ICI


Guide de Démarrage

Pour lancer le serveur de développement local :

npm run dev
# ou yarn dev ou pnpm dev


Ouvrez http://localhost:3000 dans votre navigateur.

Architecture du Projet

Le projet suit la structure standard de Next.js avec l'App Router :

src/app/ : Contient les différentes routes (pages) et layouts.

page.tsx : Page d'accueil (affiche les équipes).

layout.tsx : Layout principal (Navbar, Footer, ThemeProvider).

loading.tsx : Loader global par défaut.

teams/ : Route pour la liste des équipes (redondant si page.tsx les affiche).

teams/[teamId]/ : Route dynamique pour les détails d'une équipe.

page.tsx : Page serveur pour récupérer les données.

loading.tsx : Loader spécifique pour cette page.

schedule/ : Route pour le calendrier et les résultats.

standings/ : Route pour le classement.

src/components/ : Contient les composants React réutilisables (Client et Server Components).

Navbar.tsx : Barre de navigation supérieure et inférieure.

Footer.tsx : Pied de page.

TeamCard.tsx : Carte pour afficher une équipe.

GameCard.tsx : Carte pour afficher un match (résultat ou à venir).

StandingsTable.tsx : Tableau pour afficher le classement.

PlayerCard.tsx : Carte pour afficher un joueur.

SearchBar.tsx : Composant de recherche (Client Component).

ThemeToggle.tsx : Bouton pour changer de thème (Client Component).

ThemeProvider.tsx : Provider pour next-themes (Client Component).

TeamDetailsDisplay.tsx: Composant client pour afficher les détails d'une équipe.

(Bonus) StandingsChart.tsx : Graphique pour le classement.

(Bonus) ExportButton.tsx : Bouton d'export CSV.

src/lib/ : Contient la logique non-UI.

api.ts : Fonctions centralisées pour les appels à l'API AllSportsAPI.

src/data/ : Contient les données statiques (mock data pour les joueurs si utilisé).

public/ : Contient les assets statiques (images, logos).

tailwind.config.ts : Configuration de Tailwind CSS.

next.config.js : Configuration de Next.js (notamment pour les domaines d'images externes).

License

[Optionnel - ex: MIT License]