export default function Faq() {
	return (
		<section className="faq">
			<header className="faq__header">
				<h1 className="faq__title">FAQ</h1>
				<p className="faq__intro">
					Retrouve ici les réponses aux questions les plus fréquentes sur <strong>Où</strong>.
				</p>
			</header>

			{/* À propos */}
			<section className="faq__section">
				<h2 className="faq__heading">À propos du site</h2>

				<article className="faq__item">
					<h3 className="faq__question">Qu’est-ce que Où ?</h3>
					<p className="faq__answer">
						Où est une plateforme dédiée à la découverte de points d’intérêt dans les villes. Tu peux explorer des
						restaurants, attractions, hôtels, sites touristiques et plus encore, avec des informations détaillées.
					</p>
				</article>

				<article className="faq__item">
					<h3 className="faq__question">Comment fonctionne le site ?</h3>
					<p className="faq__answer">
						Sélectionne une ville, parcoure les catégories (restaurants, attractions, hébergements, etc.), puis consulte
						les fiches détaillées de chaque lieu.
					</p>
				</article>

				<article className="faq__item">
					<h3 className="faq__question">Le site est-il gratuit ?</h3>
					<p className="faq__answer">
						Oui, l’accès et la navigation sont gratuits. Certaines fonctionnalités peuvent nécessiter la création d’un
						compte.
					</p>
				</article>
			</section>

			{/* Navigation */}
			<section className="faq__section">
				<h2 className="faq__heading">Navigation et recherche</h2>

				<article className="faq__item">
					<h3 className="faq__question">Comment rechercher un lieu spécifique ?</h3>
					<p className="faq__answer">
						Utilise la barre de recherche pour entrer le nom d’un lieu ou des mots-clés. Tu peux aussi filtrer les
						résultats par catégorie ou localisation.
					</p>
				</article>

				<article className="faq__item">
					<h3 className="faq__question">Quelles sont les catégories disponibles ?</h3>
					<p className="faq__answer">
						Nous proposons plusieurs catégories : Restaurants, Hôtels, Attractions touristiques, Transport, Shopping,
						etc. (selon les villes).
					</p>
				</article>

				<article className="faq__item">
					<h3 className="faq__question">Comment voir les lieux sur une carte ?</h3>
					<p className="faq__answer">
						Chaque point d’intérêt dispose d’une localisation. Clique sur <em>« Voir sur la carte »</em> (si disponible)
						ou utilise la vue cartographique pour visualiser les lieux d’une zone.
					</p>
				</article>
			</section>

			{/* Compte */}
			<section className="faq__section">
				<h2 className="faq__heading">Compte utilisateur</h2>

				<article className="faq__item">
					<h3 className="faq__question">Dois-je créer un compte pour utiliser le site ?</h3>
					<p className="faq__answer">
						Oui. Sans compte, tu peux uniquement accéder au formulaire de connexion. Une fois connecté, tu as accès en
						lecture aux villes et points d’intérêt.
					</p>
				</article>
			</section>

			{/* Contribution */}
			<section className="faq__section">
				<h2 className="faq__heading">Contribution et contenu</h2>

				<article className="faq__item">
					<h3 className="faq__question">Comment puis-je ajouter un nouveau lieu ?</h3>
					<p className="faq__answer">
						Pour le moment, les utilisateurs ne peuvent pas créer de points d’intérêt par défaut. Si tu souhaites
						contribuer, contacte les admins à{' '}
						<a className="faq__link" href="mailto:oucontact@protonmail.com">
							oucontact@protonmail.com
						</a>{' '}
						afin d’obtenir les droits nécessaires pour ta ville.
					</p>
				</article>

				<article className="faq__item">
					<h3 className="faq__question">Les informations sont-elles vérifiées ?</h3>
					<p className="faq__answer">
						Nous faisons de notre mieux pour maintenir des informations à jour et exactes. Si tu constates une erreur,
						écris-nous à{' '}
						<a className="faq__link" href="mailto:oucontact@protonmail.com">
							oucontact@protonmail.com
						</a>
						.
					</p>
				</article>
			</section>

			{/* Villes */}
			<section className="faq__section">
				<h2 className="faq__heading">Villes et couverture</h2>

				<article className="faq__item">
					<h3 className="faq__question">Dans quelles villes êtes-vous présents ?</h3>
					<p className="faq__answer">Nous couvrons actuellement la France métropolitaine.</p>
				</article>
			</section>

			{/* Technique */}
			<section className="faq__section">
				<h2 className="faq__heading">Technique et utilisation</h2>

				<article className="faq__item">
					<h3 className="faq__question">Le site est-il compatible mobile ?</h3>
					<p className="faq__answer">
						Oui, le site est responsive et optimisé pour smartphone, tablette et ordinateur.
					</p>
				</article>

				<article className="faq__item">
					<h3 className="faq__question">Puis-je utiliser le site hors connexion ?</h3>
					<p className="faq__answer">
						Actuellement, une connexion internet est nécessaire pour accéder aux informations. Nous travaillons sur des
						fonctionnalités hors ligne.
					</p>
				</article>
			</section>

			{/* Contact */}
			<section className="faq__section faq__section--last">
				<h2 className="faq__heading">Contact et support</h2>

				<article className="faq__item">
					<h3 className="faq__question">Comment contacter le support technique ?</h3>
					<p className="faq__answer">
						Tu peux contacter le support en envoyant un email à{' '}
						<a className="faq__link" href="mailto:oucontact@protonmail.com">
							oucontact@protonmail.com
						</a>
						.
					</p>
				</article>

				<article className="faq__item">
					<h3 className="faq__question">Comment vous contacter ?</h3>
					<p className="faq__answer">
						Écris-nous à{' '}
						<a className="faq__link" href="mailto:oucontact@protonmail.com">
							oucontact@protonmail.com
						</a>
						.
					</p>
				</article>
			</section>
		</section>
	)
}
