import { DataSource } from 'typeorm';
import { User, Role } from '../entities/User';
import { City } from '../entities/City';
import { Poi } from '../entities/Poi';
import { Category } from '../entities/Category';
import { UserInfo } from '../entities/UserInfo';
import * as argon2 from 'argon2';

export async function seedDatabase(dataSource: DataSource): Promise<void> {
	console.log('🌱 Starting database seeding...');

	try {
		// Création des Repositories
		const userRepository = dataSource.getRepository(User);
		const cityRepository = dataSource.getRepository(City);
		const poiRepository = dataSource.getRepository(Poi);
		const categoryRepository = dataSource.getRepository(Category);
		const userInfoRepository = dataSource.getRepository(UserInfo);

		// Supprimer les données actuelles (optionnell - Commenter si on souhaite conserver les données)
		console.log('📝 Clearing existing data...');
		
		// Utiliser des requêtes SQL directes pour éviter les problèmes de contraintes
		await dataSource.query('TRUNCATE TABLE "poi", "user_info", "city", "user", "category" RESTART IDENTITY CASCADE');

		// 1. Création des catégories
		console.log('📂 Creating categories...');
		const categories = await categoryRepository.save([
			{
				categoryName: "Parcs, jardins et espaces naturels",
				style: "Green",
			},
			{
				categoryName: "Restauration",
				style: "DarkRed",
			},
			{
				categoryName: "Boire un coup",
				style: "Gold",
			},
			{
				categoryName: "Musée",
				style: "DarkTurquoise",
			},
			{
				categoryName: "Monument",
				style: "Plum",
			},

		]);

		console.log(`✅ Created ${categories.length} categories`);

		// 2. Création des utilisateurs
		console.log('👥 Creating users...');
		const hashedPassword = await argon2.hash('123456789');
		
		const users = await userRepository.save([
			{
				email: 'jesus.choucroute@yopmail.fr',
				hashedPassword,
				roles: [Role.ADMIN_SITE, Role.ADMIN_CITY, Role.POI_CREATOR, Role.USER],
			},
			{
				email: 'jeep.renault@yopmail.fr',
				hashedPassword,
				roles: [Role.ADMIN_CITY, Role.USER],
			},
			{
				email: 'john.doudou@yopmail.fr',
				hashedPassword,
				roles: [Role.POI_CREATOR, Role.USER],
			},
			{
				email: 'elan.naralbol@yopmail.fr',
				hashedPassword,
				roles: [Role.USER],
			},
			{
				email: 'rodeo.danger@yopmail.fr',
				hashedPassword,
				roles: [Role.USER],
			}
		]);

		console.log(`✅ Created ${users.length} users`);

		// 3. Création des userInfo
		console.log('📝 Creating user info...');
		await userInfoRepository.save([
			{
				firstName: 'Jésus',
				lastName: 'Choucroute',
				avatarUrl: 'https://example.com/admin.jpg',
				user: users[0],
			},
			{
				firstName: 'Jeep',
				lastName: 'Renault',
				avatarUrl: 'https://example.com/john.jpg',
				user: users[1],
			},
			{
				firstName: 'John',
				lastName: 'Doudou',
				avatarUrl: 'https://example.com/jane.jpg',
				user: users[2],
			},
			{
				firstName: 'Elan',
				lastName: 'Naralbol',
				avatarUrl: 'https://example.com/john.jpg',
				user: users[3],
			},
			{
				firstName: 'Rodéo',
				lastName: 'Danger',
				avatarUrl: 'https://example.com/jane.jpg',
				user: users[4],
			}
		]);

		// 4. Création des villes
		console.log('🏙️ Creating cities...');
		const cities = await cityRepository.save([
			{
				cityName: 'Grenoble',
				description: 'Grenoble, ville de la région Rhône-Alpes du sud-est de la France, se trouve au pied des montagnes entre le Drac et l\'Isère.',
				imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.jbhl-q2YJtlGFWhTT9pj9gHaFn%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=f45683e38a060f62e98e05547f1de2ec0d959a8732c265aba211a232338ef192&ipo=images',
				cityLatitude: 45.166672,
				cityLongitude: 5.71667,
			},
			{
				cityName: 'Toulouse',
				description: 'La ville rose, capitale européenne de l\'aéronautique et du spatial.',
				imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.wm9YbdW-TRct9AYnPaWcBgHaE7%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=a017fe1cee25263910cf77acf518565d4d5fc5119e812dff432e270f818f9074&ipo=images',
				cityLatitude: 43.6047,
				cityLongitude: 1.4442,
			},
			{
				cityName: 'Paris',
				description: 'La capitale de la France, ville lumière connue pour ses monuments emblématiques.',
				imageUrl: 'https://media.cntraveller.com/photos/611bed85a86777b29fbc54bc/master/w_2048%2Cc_limit/22_most-instagrammable-places-in-paris-conde-nast-traveller-6nov17-mary-quincy.jpg',
				cityLatitude: 48.8566,
				cityLongitude: 2.3522,
			},
			{
				cityName: 'Lyon',
				description: 'Ville historique réputée pour sa gastronomie et son patrimoine Renaissance.',
				imageUrl: 'https://t3.ftcdn.net/jpg/01/49/37/14/240_F_149371466_N8UYp1otnim3CoC7NaA1PdgFTFTgNOUa.jpg',
				cityLatitude: 45.7640,
				cityLongitude: 4.8357,
			},
			{
				cityName: 'Marseille',
				description: 'Port méditerranéen multiculturel, porte d\'entrée vers la Provence.',
				imageUrl: 'https://media.routard.com/image/06/5/photo.1536065.w1000.jpg',
				cityLatitude: 43.2965,
				cityLongitude: 5.3698,
			},
			{
				cityName: 'Biarritz',
				description: 'Biarritz, élégante ville balnéaire de la côte basque, dans le sud-ouest de la France.',
				imageUrl: 'https://imgs.search.brave.com/-W3RXU9Bypk7A8QQ8_7_peFkpKYSc_xtT9OT5ZNkGIE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/MDAzNzkzNC9mci9w/aG90by9iaWFycml0/ei5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Y0R1TzNJWjBC/ZTZDZzdnTnhLcGdr/TlhjT1Q0X1FpX0w3/ZThicHlQZWxVcz0',
				cityLatitude: 43.4832523,
				cityLongitude: -1.5592776,
			},
		]);

		console.log(`✅ Created ${cities.length} cities`);

		// 5. Création POIs
		console.log('📍 Creating points of interest...');
		const pois = [

			// Paris
			{
				poiName: 'Tour Eiffel',
				address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
				poiLatitude: 48.8584,
				poiLongitude: 2.2945,
				imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.uRbN5EvoasDiiEhzKH4BbQHaE8%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=122a81afb2b74c89559e6fca038233905b87164c9abb65bb74bca821cca58572&ipo=images',
				poiDescription: 'Monument emblématique de Paris',
				externalLink: 'https://www.toureiffel.paris/sites/default/files/styles/narrow_600/public/2017-11/t2.jpg?itok=dtBX6d4m',
				poiCity: cities.find(c => c.cityName === 'Paris')!,
				poiCategory: categories.find(c => c.categoryName === 'Monument')!,
			},
			{
				poiName: 'Le Louvre',
				address: 'Rue de Rivoli, 75001 Paris',
				poiLatitude: 48.8606,
				poiLongitude: 2.3376,
				imageUrl: 'https://imgs.search.brave.com/WBiSAdTDjUP71Y9xrK_2vv5MwKLSTrIBDA3CNX0anlI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMjY3/NTI2Ni9wZXhlbHMt/cGhvdG8tMjY3NTI2/Ni5qcGVnP2F1dG89/Y29tcHJlc3MmY3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA',
				poiDescription: 'Musée d\'art le plus visité au monde',
				externalLink: 'https://www.louvre.fr/',
				poiCity: cities.find(c => c.cityName === 'Paris')!,
				poiCategory: categories.find(c => c.categoryName === 'Musée')!,
			},
			{
				poiName: 'Restaurant Le Procope',
				address: '13 Rue de l\'Ancienne Comédie, 75006 Paris',
				poiLatitude: 48.8534,
				poiLongitude: 2.3387,
				imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcontent.eventail.be%2Fmedia%2F2024%2F04%2FProcope_original-1024x824.jpg&f=1&nofb=1&ipt=d3c26145f6f4a372fef6f37d2285ecc9cb95238a4c665fa3fcea2f910c09e864',
				poiDescription: 'Restaurant historique parisien',
				externalLink: 'https://procope.com/',
				poiCity: cities.find(c => c.cityName === 'Paris')!,
				poiCategory: categories.find(c => c.categoryName === 'Restauration')!,
			},

			// Lyon
			{
				poiName: 'Basilique Notre-Dame de Fourvière',
				address: '8 Pl. de Fourvière, 69005 Lyon',
				poiLatitude: 45.7624,
				poiLongitude: 4.8227,
				imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.iO5coj0ZP-m9gtrnl2BKQgHaFj%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=65eb33caa294659528bb206e98ddd1a84839eb6705cd28b3ea817b10e9dd8279&ipo=images',
				poiDescription: 'Basilique perchée sur la colline de Fourvière',
				externalLink: 'https://www.fourviere.org/',
				poiCity: cities.find(c => c.cityName === 'Lyon')!,
				poiCategory: categories.find(c => c.categoryName === 'Monument')!,
			},
			{
				poiName: 'Aklé',
				address: '85 Rue Paul Bert',
				poiLatitude: 45.7609011,
				poiLongitude: 4.8388525,
				imageUrl: 'https://akle.fr/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-10-at-17.22.34.jpeg',
				poiDescription: 'Ce restaurant au cadre sobre et chic propose des saveurs libanaises avec menu enfants sur place ou à emporter.',
				externalLink: 'http://www.akle.fr/',
				poiCity: cities.find(c => c.cityName === 'Lyon')!,
				poiCategory: categories.find(c => c.categoryName === 'Restauration')!,
			},
			{
				poiName: 'Lipopette Terreaux - Bistrot japonais',
				address: '17 Rue Hippolyte Flandrin',
				poiLatitude: 45.7671699,
				poiLongitude: 4.8347756,
				imageUrl: 'https://imgs.search.brave.com/_5gQ4eIAPLhOi7-LN3-vTR9T7UJ_CXixgCeFlLP1fhI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubWFwc3RyLmNv/bS80NzNkYTU0MTAx/MjYwYTJiYjhmOTlj/ZDJiNDA3OGEyYV9p/bWFnZV9lMDAzZjNi/My1iYTA4LTRmNjYt/YjI5MS1iMDE1OGY3/OWM4NjguanBlZw',
				poiDescription: 'Bar restaurant franco-japonnais, végé, ambiance sympa et délicieuse.',
				externalLink: 'https://www.lipopettelyon.fr/',
				poiCity: cities.find(c => c.cityName === 'Lyon')!,
				poiCategory: categories.find(c => c.categoryName === 'Restauration')!,
			},

			// Marseille
			{
				poiName: 'Vieux-Port de Marseille',
				address: 'Quai du Port, 13002 Marseille',
				poiLatitude: 43.2951,
				poiLongitude: 5.3756,
				imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.GnK-WitNlypUgqiP0AEA6wHaE7%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=22e8dbfc420f130acbcb191902b152d0ca921de3c80cfddfee2343d8bdd001ff&ipo=images',
				poiDescription: 'Port historique de Marseille',
				externalLink: 'https://www.marseille-tourisme.com/',
				poiCity: cities.find(c => c.cityName === 'Marseille')!,
				poiCategory: categories.find(c => c.categoryName === 'Monument')!,
			},
			{
				poiName: 'Basilique Notre-Dame de la Garde',
				address: 'Domaine Notre Dame de la Garde, Rue Fort du Sanctuaire',
				poiLatitude: 43.283946,
				poiLongitude: 5.371242,
				imageUrl: 'https://imgs.search.brave.com/2HpAqJ6Dc1LHYoFpvUhYy71ZAg3UY4jmB1hFfmUKX2Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGFzc2Vyc29ucGVy/bWlzYmF0ZWF1LmNv/bS9wdWJsaWMvaW1n/L21lZGl1bS9tYXJz/ZWlsbGUzNzE2ODgy/MTI4MGpwZ182Njkx/MWVlYzAxODYyLmpw/Zw',
				poiDescription: 'Port historique de Marseille',
				externalLink: 'https://basiliquenotredamedelagarde.com/',
				poiCity: cities.find(c => c.cityName === 'Marseille')!,
				poiCategory: categories.find(c => c.categoryName === 'Monument')!,
			},
			{
				poiName: 'Bouillabaisse Chez Fonfon',
				address: '140 Rue du Vallon des Auffes, 13007 Marseille',
				poiLatitude: 43.2844,
				poiLongitude: 5.3556,
				imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.p5lVHeak_HjCEKq2cOt_uAAAAA%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=efdbe99361e2bc3b9e89af95b44910eb492b0d8d6b6a08ccabf5d7e952a41cac&ipo=images',
				poiDescription: 'Restaurant spécialisé en bouillabaisse',
				externalLink: 'https://chez-fonfon.com/',
				poiCity: cities.find(c => c.cityName === 'Marseille')!,
				poiCategory: categories.find(c => c.categoryName === 'Restauration')!,
			},
			{
				poiName: 'Calanques de Marseille',
				address: 'Marseille',
				poiLatitude: 43.203182,
				poiLongitude: 5.450285,
				imageUrl: 'https://imgs.search.brave.com/7tAvDoz9R38Ux3t8GUH5uqF-UKPjqNVhKirtGcGC8tQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGl2ZW50by5jb20v/MTg1NTQvbGVzLWNh/bGFucXVlcy1tYXJz/ZWlsbGUuanBn',
				poiDescription: 'Parc national sur littoral incluant formations géologiques uniques et grottes sous-marines avec inscriptions.',
				externalLink: 'https://www.marseille.fr/',
				poiCity: cities.find(c => c.cityName === 'Marseille')!,
				poiCategory: categories.find(c => c.categoryName === 'Parcs, jardins et espaces naturels')!,
			},

			// Toulouse
			{
				poiName: 'Capitole de Toulouse',
				address: 'Pl. du Capitole, 31000 Toulouse',
				poiLatitude: 43.6045,
				poiLongitude: 1.4440,
				imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.xm5oVirrcdtX0odjaJSZZgHaEK%3Fpid%3DApi&f=1&ipt=8de4129c0bd1ca40aeb7e3db32c5727d4132226319726e154f478cbdfd080fd3&ipo=images',
				poiDescription: 'Hôtel de ville et théâtre de Toulouse',
				externalLink: 'https://www.toulouse.fr/',
				poiCity: cities.find(c => c.cityName === 'Toulouse')!,
				poiCategory: categories.find(c => c.categoryName === 'Monument')!,
			},
			{
				poiName: "Jardin des Plantes",
				address: "31 All. Jules Guesde",
				imageUrl: "https://www.grizette.com/wp-content/uploads/2019/06/JardindesPlantesdeToulouse©ML.jpg",
				externalLink: "https://metropole.toulouse.fr/",
				poiCity: cities.find(c => c.cityName === 'Toulouse')!,
				poiCategory: categories.find(c => c.categoryName === 'Parcs, jardins et espaces naturels')!,
				poiLatitude: 43.59359,
				poiLongitude: 1.447186,
				poiDescription: "Jardin botanique du XVIIIe et jardin public avec étang, aire de jeux et collection de plantes médicinales."
			},

			// Biarritz
			{
				poiName: 'Rocher de la Vierge',
				address: 'Rocher de la Vierge',
				poiLatitude: 43.484109,
				poiLongitude: -1.57047,
				imageUrl: 'https://imgs.search.brave.com/1UbccT8KS4vA8FI_PjO9Uw-U6Rs5uBlsZnrSVLtutOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YmFybmVzLWNvdGVi/YXNxdWUuY29tL3Jh/aWxzL2FjdGl2ZV9z/dG9yYWdlL3JlcHJl/c2VudGF0aW9ucy9y/ZWRpcmVjdC9leUpm/Y21GcGJITWlPbnNp/WkdGMFlTSTZNakF3/Tmpnc0luQjFjaUk2/SW1Kc2IySmZhV1Fp/ZlgwPS0tZTk0MjNm/ZTY4YTg4NjcyYmI2/M2Q5YTliMjY0ZWVl/ZGMxOTNmNWZjMi9l/eUpmY21GcGJITWlP/bnNpWkdGMFlTSTZl/eUptYjNKdFlYUWlP/aUpxY0djaUxDSnpZ/WFpsY2lJNmV5Snhk/V0ZzYVhSNUlqbzBN/SDE5TENKd2RYSWlP/aUoyWVhKcFlYUnBi/MjRpZlgwPS0tODk0/OGU2M2ZjOWJlMTU1/ZjI0MzBlZWZhYTZm/MGRmOTBiYzU5YjI1/Zi9yb2NoZXItZGUt/bGEtdmllcmdlLmpw/Zw',
				poiDescription: 'Célèbre formation rocheuse dans le golfe de Gascogne avec vue spectaculaire et statue de la Vierge au sommet.',
				externalLink: 'http://pays-basque.tourisme64.com/harmonie/lieux-choisis/rocher-de-la-vierge/',
				poiCity: cities.find(c => c.cityName === 'Biarritz')!,
				poiCategory: categories.find(c => c.categoryName === 'Parcs, jardins et espaces naturels')!,
			},
			{
				poiName: "La Grande Plage",
				address: "La Grande Plage",
				imageUrl: "https://imgs.search.brave.com/uvIZSlP_pSsd00aw0UBCBgZeXOhOboGjzLqe_7bcV_8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdXJm/aW5nYmlhcnJpdHou/ZnIvd3AtY29udGVu/dC91cGxvYWRzLzIw/MjIvMDQvR3JhbmRl/LVBsYWdlLWJpYXJy/aXR6LTEwMjR4NTM4/LmpwZw",
				externalLink: "https://www.biarritz.fr/",
				poiCity: cities.find(c => c.cityName === 'Biarritz')!,
				poiCategory: categories.find(c => c.categoryName === 'Parcs, jardins et espaces naturels')!,
				poiLatitude: 43.487866,
				poiLongitude: -1.556060,
				poiDescription: "La promenade de la Grande Plage borde la plage de surf du Miramar. Elle est particulièrement appréciée pour la vue qu'elle offre sur l'océan Atlantique."
			},

			// Grenoble
			{
				poiName: 'Bastille',
				address: 'Quai Stéphane Jay',
				poiLatitude: 45.19917,
				poiLongitude: 5.72453,
				imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.TsGoBkPjWg-18t-XVNGN3AHaE7%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=dd2351673ec288d673fa83c4bf6a99b5d2dc5fdd36aeb1d8fb3e84d05c21234e&ipo=images',
				poiDescription: 'La Bastille est un fort militaire surplombant de 264 mètres la ville de Grenoble. Édifié durant la première partie du XIXe siècle et culminant à 476 mètres[1] sur les derniers contreforts du massif de la Chartreuse, il a remplacé une première fortification construite à la fin du XVIe siècle.',
				externalLink: 'https://bastille-grenoble.fr/',
				poiCity: cities.find(c => c.cityName === 'Grenoble')!,
				poiCategory: categories.find(c => c.categoryName === 'Monument')!,
			},
			{
				poiName: "Musée bibliothèque de Grenoble",
				address: "La Grande Plage",
				imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.BQW_Ri2Ngll_-QHXIYaZHQHaFj%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=35087c522f184e88a949a3f59c6b35c21c131c6760212dc1484a3686bf5b743a&ipo=images",
				externalLink: "https://www.museedegrenoble.fr/",
				poiCity: cities.find(c => c.cityName === 'Grenoble')!,
				poiCategory: categories.find(c => c.categoryName === 'Parcs, jardins et espaces naturels')!,
				poiLatitude: 45.18823,
				poiLongitude: 5.73649,
				poiDescription: "Le musée-bibliothèque de Grenoble est un édifice culturel du XIXe siècle situé place de Verdun à Grenoble. Achevé et ouvert au public en 1870, il a accueilli jusqu'en 1970 la bibliothèque municipale de Grenoble et jusqu'en 1992 les collections du musée de Grenoble. "
			},
		];

		await poiRepository.save(pois);
		console.log(`✅ Created ${pois.length} points of interest`);

		console.log('🎉 Database seeding completed successfully!');
		console.log('📊 Summary:');
		console.log(`   - ${categories.length} categories`);
		console.log(`   - ${users.length} users`);
		console.log(`   - ${cities.length} cities`);
		console.log(`   - ${pois.length} POIs`);

	} catch (error) {
		console.error('❌ Error during database seeding:', error);
		throw error;
	}
}

// Fonction pour nettoyer la base de données
export async function clearDatabase(dataSource: DataSource): Promise<void> {
	console.log('🧹 Clearing database...');

	try {
		const poiRepository = dataSource.getRepository(Poi);
		const userInfoRepository = dataSource.getRepository(UserInfo);
		const cityRepository = dataSource.getRepository(City);
		const userRepository = dataSource.getRepository(User);
		const categoryRepository = dataSource.getRepository(Category);

		await poiRepository.clear();
		await userInfoRepository.clear();
		await cityRepository.clear();
		await userRepository.clear();
		await categoryRepository.clear();

		console.log('✅ Database cleared successfully');
	} catch (error) {
		console.error('❌ Error during database clearing:', error);
		throw error;
	}
}