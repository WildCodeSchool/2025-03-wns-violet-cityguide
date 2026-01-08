#plan sans accroc
- refonte de la ci

	**Etapes** :

	##0 (re)nommer correctement les fichiers de workflows.
	
	##1 pr vers dev -> tests unitaires et intégration sur tous les fichiers.
	
	##2 pr vers stage -> tests unitaires, intégration, end to end. 
	
	##3 push vers staging -> génération & push des images docker vers DockerHub + notification du vps.
	- Récupération du code source, prédéfinis. 
	- Fabrication de l'image(build) -> push sur DockerHub
	- Notification du vps

	##4 push vers prod -> déploiement manuel, prod vps.
	- notification du vps uniquement (via le bouton)

- fichier utile pour le dossier ! ne pas supprimer !