# Où - City guide 🇫🇷

## Adresse du site / app link
[Où City guide](https://032025-bleu-1.wns.wilders.dev/)

## Installer le projet localement :
* Cloner le projet avec la commande : ```git clone git@github.com:WildCodeSchool/2025-03-wns-violet-cityguide.git```

## Démarrer le projet :
* Compléter le fichier ```.env.dev``` en utilisant le fichier ```.env.sample``` comme gabarit
* Utiliser la commande ```make dev``` pour démarrer les containers docker
* Se rendre sur ```localhost:7000```

## S'affranchir des erreurs d'import/utilisation de dépendances dans les fichiers pour le développement
Exécuter les commandes suivantes : 
* Installation des dépendances : ```npm i``` (à la racine du projet et dans le sous-dossier frontend)
* Installation de argon2 : ```npm i argon2```
* Installation de jsonWebToken : ```npm i @types/jsonwebtoken```


## Conventions à respecter pour participer au développement du projet
* Obligatoire
	* Utiliser `LF` et non `CRLF`
	* Utiliser les tabulations au lieu des espaces pour l'indentation du code **SAUF pour les fichiers compose.*.yaml et les fichiers de worklows** qui DOIVENT ÊTRE indentés avec des espaces
	* Ne pas utiliser de variables raccourcies (ex : utiliser "index" au lieu de "i" dans les boucles)
	* __Commenter__ le code
	* Respecter le formalisme des messages de commit (cf `Messages de commmit`)

* Conseillé
	* Nous sommes une équipe francophone, dans la mesure du possible, utiliser le français pour commenter le code

### À l'aide !
* Configurer l'utilisation de `LF`:
	* Commande à exécuter : `git config --global core.autocrlf false` (empêche le remplacement automatique de `LF` en `CRLF` par git)
	* S'assurer que l'IDE utilise bien `LF` :
		* VSCode : 
			* Soit en bas à droite de la fenêtre, cliquer sur `CRLF` et choisir `LF`
			* Soit utiliser `CTRL + ,`, taper `eol` dans la barre de recherche et sélectionner `\n`
		* JetBrains : `https://www.jetbrains.com/help/webstorm/configuring-line-endings-and-line-separators.html`
* Utiliser des tabulations au lieu des espaces (VSCode): 
	* Configuration : `File > Preferences > Settings`, taper `insert spaces` dans la barre de recherche, décocher `Editor: Detect Indentation` et `Editor: Insert Spaces`
	* Réparation : Dans les fichier existants, utiliser `CTRL + Shift + P` et taper `Convert indentation to tabs` dans le champ qui apparaît

### Messages de commmit :
Format :
```
<type>(<scope>): <sujet>
    retour à la ligne
<corps>
```

Type : 
* `build` : Changements qui affectent le system de build ou des dépendances externes (par exemple : `build(npm): nomDeLaDependance`)
* `ci` : Changement dans les fichiers de configuration de l'intégration continue (par exemple : `ci(docker): nouvelleConfiguration`)
* `docs` : Uniquement des modifications de documentation
* `feat` : __UNE__ nouvelle feature
* `fix` : Correction de bug
* `perf` : Modification de code qui améliore la performance
* `refactor` : Modification de code qui n'est ni une correction de bug ni une nouvelle feature
* `style` : changements qui n'affectent pas le "sens" du code (espaces, formatage, point virgule manquant...)
* `test` : Ajout ou correction de test(s)

Exemples de scope :
* common
* elements
* nom du/des fichiers principaux modifiés

Sujet : 
* Utiliser l'impératif présent: "modifie" pas "modifié" ou "modifications" 
* Ne pas utiliser de majuscule pour la première lettre
* Ne pas ajouter de point à la fin du sujet

Corps :
* Comme dans le sujet, utiliser l'impératif présent
* Le corps devrait indiquer quelle est la différence entre l'ancien et le nouveau comportement

# Où - City guide 🇬🇧

## Install project locally:
Clone project using `git clone git@github.com:WildCodeSchool/2025-03-wns-violet-cityguide.git` command

## Start project:
* Fill `.env.dev` file using `.env.sample` as template
* Use `make dev` command to start docker containers
* Go to URL: `localhost:7000`

## Get rid off import/use dependancies errors for development tasks:
* Dependancies installation: `npm i` (in root folder and frontend subfolder)
* argon2 installation: `npm i argon2`
* jsonWebToken installation: `npm i @types/jsonwebtoken`

## Project development conventions
* Mandatory
	* Use `LF` instead of `CRLF`
	* Use tabulations and not spaces to indent code **EXCEPT in compose.*.yaml and workkflows files** which MUST BE indented with spaces
	* Do not use short variables (eg: use "index" instead of "i" in loops)
	* __Comment__ your code
	* Commit messages must be compliant to the convention you can find in `Commit messages` section

* Recommended
	* We are a French team, use French if you can to comment your code (but prioritize __commenting__ over language)

### Help me!
* How to use `LF`:
	* Use command line `git config --global core.autocrlf false` (to prevent git from replacign `LF` by `CRLF`)
	* Ensure that your code editor uses `LF` :
		* VSCode : 
			* Either on the right bottom of VSCode window, click on  `CRLF` and choose `LF`
			* Either use `CTRL + ,`, type `eol` in the search bar and select `\n`
		* JetBrains : `https://www.jetbrains.com/help/webstorm/configuring-line-endings-and-line-separators.html`
* How to use tabs instead of spaces (VSCode): 
	* Config: `File > Preferences > Settings`, type `insert spaces` in search bar and uncheck `Editor: Detect Indentation` and `Editor: Insert Spaces`
	* Fix: in existing files, use `CTRL + Shift + P` and type `Convert indentation to tabs` in the generated input

### Commit messages:
Format:
```
<type>(<scope>): <subject>
    line break
<body>
```
`Type`: 
* `build`: Changes that affect the build system or external dependencies (example: `build(npm): nameOfDependancies`)
* `ci`: Changes to our CI configuration files and scripts (example: `ci(docker): newConfiguration`)
* `docs`: Documentation only changes
* `feat`: A new feature
* `fix`: A bug fix
* `perf`: A code change that improves performance
* `refactor`: A code change that neither fixes a bug nor adds a feature
* `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* `test`: Adding missing tests or correcting existing tests

`Scope examples`:
* common
* elements
* Main modified file(s) name

`Sujet`: 
* Use imperative: "modif" not "modified" or "modifications" 
* Do not capitalize the first letter
* Do not add a dot at the end of the subject line

`Body`:
* As in the subject, use imperative
* Body should indicate what different comportement is induce by the modifications