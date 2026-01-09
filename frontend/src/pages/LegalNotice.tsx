export default function LegalNotice() {
	return (
		<div className="legalNotice">
			<header className="legalNotice__header">
				<h1 className="legalNotice__title">Mentions légales</h1>
				<p className="legalNotice__intro">
					Les présentes mentions légales encadrent l’utilisation de l’application{' '}
					<strong>Où</strong>.
				</p>
			</header>

			<section className="legalNotice__section">
				<h2 className="legalNotice__heading">1. Éditeur de l’application</h2>
				<p>La présente application, dénommé <strong>Où</strong>, est édité par :</p>

				<dl className="legalNotice__list">
					<div className="legalNotice__row">
						<dt>Nom / Raison sociale</dt>
						<dd>Où</dd>
					</div>
					<div className="legalNotice__row">
						<dt>Forme juridique</dt>
						<dd>SAS</dd>
					</div>
					<div className="legalNotice__row">
						<dt>Capital social</dt>
						<dd>2€</dd>
					</div>
					<div className="legalNotice__row">
						<dt>Siège social</dt>
						<dd>22 avenue des jolies fleurs, 69458 Lyon</dd>
					</div>
					<div className="legalNotice__row">
						<dt>Numéro d’immatriculation</dt>
						<dd>RCS</dd>
					</div>
					<div className="legalNotice__row">
						<dt>Adresse e-mail</dt>
						<dd>
							<a className="legalNotice__link" href="mailto:oucontact@protonmail.com">
								oucontact@protonmail.com
							</a>
						</dd>
					</div>
				</dl>
			</section>

			<section className="legalNotice__section">
				<h2 className="legalNotice__heading">2. Directeur de la publication</h2>
				<dl className="legalNotice__list">
					<div className="legalNotice__row">
						<dt>Nom et prénom</dt>
						<dd>Ansar Rémy, Buil Laura, Magisson-Bonnel Claire, Vidoni Roxane</dd>
					</div>
					<div className="legalNotice__row">
						<dt>Fonction</dt>
						<dd>Concepteur·ices et Développeur·euses de l'application</dd>
					</div>
				</dl>
			</section>

			<section className="legalNotice__section">
				<h2 className="legalNotice__heading">3. Hébergement</h2>
				<p>L’application est hébergé par Simplon</p>

				<dl className="legalNotice__list">
					<div className="legalNotice__row">
						<dt>Site web</dt>
						<dd>
							<a className="legalNotice__link" href="https://www.simplon.co/" target="_blank" rel="noreferrer">
								Simplon
							</a>
						</dd>
					</div>
				</dl>
			</section>

			<section className="legalNotice__section">
				<h2 className="legalNotice__heading">4. Description du service</h2>
				<p>
					L’application <strong>Où</strong> permet aux utilisateurs authentifiés de consulter des
					points d’intérêt associés à des villes sélectionnées, ainsi que les informations détaillées relatives à ces
					points d’intérêt.
				</p>
				<p>L’accès au contenu du site est conditionné à la création et à la connexion à un compte utilisateur.</p>
			</section>

			<section className="legalNotice__section">
				<h2 className="legalNotice__heading">5. Rôles et droits des utilisateurs</h2>
				<p>L’application propose plusieurs niveaux de droits :</p>

				<div className="legalNotice__cards">
					<article className="legalNotice__card">
						<h3 className="legalNotice__cardTitle">Administrateur du site</h3>
						<ul className="legalNotice__bullets">
							<li>Ajouter, modifier et supprimer des villes</li>
							<li>Ajouter, modifier et supprimer des points d’intérêt</li>
							<li>Gérer le contenu global de l’application</li>
						</ul>
					</article>

					<article className="legalNotice__card">
						<h3 className="legalNotice__cardTitle">Administrateur de ville</h3>
						<ul className="legalNotice__bullets">
							<li>Ajouter et modifier une ville</li>
							<li>Ajouter, modifier et supprimer des points d’intérêt rattachés à cette ville</li>
							<li>Attribuer à un utilisateur le rôle de créateur de point d’intérêt</li>
						</ul>
					</article>

					<article className="legalNotice__card">
						<h3 className="legalNotice__cardTitle">Créateur de point d’intérêt</h3>
						<ul className="legalNotice__bullets">
							<li>Créer des points d’intérêt</li>
						</ul>
					</article>

					<article className="legalNotice__card">
						<h3 className="legalNotice__cardTitle">Utilisateur connecté</h3>
						<ul className="legalNotice__bullets">
							<li>Droit de lecture sur l’ensemble du site</li>
							<li>Consultation des villes et des points d’intérêt disponibles</li>
						</ul>
					</article>

					<article className="legalNotice__card">
						<h3 className="legalNotice__cardTitle">Visiteur non connecté</h3>
						<ul className="legalNotice__bullets">
							<li>Accès uniquement au formulaire de connexion</li>
							<li>Aucun accès au contenu du site</li>
						</ul>
					</article>
				</div>
			</section>

			<section className="legalNotice__section">
				<h2 className="legalNotice__heading">6. Accès au service</h2>
				<p>
					L’utilisateur s’engage à fournir des informations exactes lors de la création de son compte et à conserver la
					confidentialité de ses identifiants.
				</p>
				<p>
					L’éditeur se réserve le droit de suspendre ou de supprimer tout compte en cas de non-respect des présentes
					mentions légales ou d’usage abusif du service.
				</p>
			</section>

			<section className="legalNotice__section">
				<h2 className="legalNotice__heading">7. Responsabilité</h2>
				<p>
					L’éditeur met tout en œuvre pour assurer l’exactitude et la mise à jour des informations publiées. Toutefois,
					il ne saurait être tenu responsable :
				</p>
				<ul className="legalNotice__bullets">
					<li>des erreurs, omissions ou informations obsolètes ;</li>
					<li>des interruptions ou dysfonctionnements du service ;</li>
					<li>de l’utilisation des informations consultées via l’application.</li>
				</ul>
				<p>Les contenus relatifs aux points d’intérêt sont fournis à titre informatif et peuvent être modifiés sans préavis.</p>
			</section>

			<section className="legalNotice__section">
				<h2 className="legalNotice__heading">8. Propriété intellectuelle</h2>
				<p>
					L’ensemble des éléments constituant le  l’application (textes, images, logos, graphismes, structure, base
					de données, code, etc.) est protégé par le droit de la propriété intellectuelle.
				</p>
				<p>
					Toute reproduction ou exploitation, totale ou partielle, sans autorisation préalable écrite de l’éditeur est
					interdite.
				</p>
			</section>

			<section className="legalNotice__section">
				<h2 className="legalNotice__heading">9. Données personnelles</h2>
				<p>
					Les données personnelles collectées sont traitées conformément à la réglementation en vigueur, notamment au{' '}
					<strong>Règlement Général sur la Protection des Données (RGPD)</strong>.
				</p>
				<p>L’utilisateur dispose des droits suivants :</p>
				<ul className="legalNotice__bullets">
					<li>accès,</li>
					<li>rectification,</li>
					<li>suppression,</li>
					<li>limitation du traitement,</li>
					<li>opposition.</li>
				</ul>
				<p>
					Toute demande peut être adressée à :{' '}
					<a className="legalNotice__link" href="mailto:oucontact@protonmail.com">
						oucontact@protonmail.com
					</a>
					.
				</p>
			</section>

			<section className="legalNotice__section">
				<h2 className="legalNotice__heading">10. Cookies</h2>
				<p>
					L’application peut utiliser des cookies ou technologies similaires afin d’assurer son bon fonctionnement
					et d’améliorer l’expérience utilisateur.
				</p>
				<p>L’utilisateur peut paramétrer son navigateur afin de refuser les cookies.</p>
			</section>

			<section className="legalNotice__section legalNotice__section--last">
				<h2 className="legalNotice__heading">11. Droit applicable</h2>
				<p>Les présentes mentions légales sont soumises au droit français.</p>
				<p>En cas de litige, les tribunaux français seront compétents.</p>
			</section>
		</div>
	)
}
