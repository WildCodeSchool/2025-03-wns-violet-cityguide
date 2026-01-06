# Connexion à adminer :
Système : PostreSQL
Serveur : database (même nom que le service dans compose.yaml)
Utilisateur : valeur de DB_USER
Mot de passe : valeur de DB_PASSWORD
Base de données : valeur de DB_DATABASE

# Template messages de commit :
Format :
<type>(<scope>): <sujet>
	retour à la ligne
<corps>

Type : 
	build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
	ci: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
	docs: Documentation only changes
	feat: A new feature
	fix: A bug fix
	perf: A code change that improves performance
	refactor: A code change that neither fixes a bug nor adds a feature
	style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
	test: Adding missing tests or correcting existing tests

Exemples de scope :
	common
	elements
	nom du/des fichiers principaux modifiés

Sujet : 
	Utiliser l'impératif présent: "modifie" pas "modifié" ou "modifications" 
	Ne pas utiliser de majuscule pour la première lettre
	Ne pas ajouter de point à la fin du sujet

Corps :
	Comme danns le sujet, utiliser l'impératif présent
	Le body devrait indiquer quelle est la différence entre l'ancien et le nouveau comportement

# Connexion Docker hub si pb au make dev : 
Docker login en CLI => confirmation code terminal - navigateur => plus de pb pour pull images
