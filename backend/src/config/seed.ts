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
    // Repositories
    const userRepository = dataSource.getRepository(User);
    const cityRepository = dataSource.getRepository(City);
    const poiRepository = dataSource.getRepository(Poi);
    const categoryRepository = dataSource.getRepository(Category);
    const userInfoRepository = dataSource.getRepository(UserInfo);

    // Clear existing data (optional - remove if you want to keep existing data)
    console.log('📝 Clearing existing data...');
    
    // Utiliser des requêtes SQL directes pour éviter les problèmes de contraintes
    await dataSource.query('TRUNCATE TABLE "poi", "user_info", "city", "user", "category" RESTART IDENTITY CASCADE');

    // 1. Create Categories
    console.log('📂 Creating categories...');
    const categories = await categoryRepository.save([
      {
        categoryName: 'Restaurant',
        style: '🍽️',
      },
      {
        categoryName: 'Hôtel',
        style: '🏨',
      },
      {
        categoryName: 'Attraction',
        style: '🎡',
      },
      {
        categoryName: 'Transport',
        style: '🚌',
      },
      {
        categoryName: 'Shopping',
        style: '🛍️',
      }
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // 2. Create Users
    console.log('👥 Creating users...');
    const hashedPassword = await argon2.hash('password123');
    
    const users = await userRepository.save([
      {
        email: 'admin@example.com',
        hashedPassword,
        roles: [Role.ADMIN_SITE],
      },
      {
        email: 'john@example.com',
        hashedPassword,
        roles: [Role.USER],
      },
      {
        email: 'jane@example.com',
        hashedPassword,
        roles: [Role.USER],
      }
    ]);

    console.log(`✅ Created ${users.length} users`);

    // 3. Create UserInfo for users
    console.log('📝 Creating user info...');
    await userInfoRepository.save([
      {
        firstName: 'Admin',
        lastName: 'User',
        avatarUrl: 'https://example.com/admin.jpg',
        user: users[0],
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        avatarUrl: 'https://example.com/john.jpg',
        user: users[1],
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        avatarUrl: 'https://example.com/jane.jpg',
        user: users[2],
      }
    ]);

    // 4. Create Cities
    console.log('🏙️ Creating cities...');
    const cities = await cityRepository.save([
      {
        cityName: 'Paris',
        description: 'La capitale de la France, ville lumière connue pour ses monuments emblématiques',
        imageUrl: 'https://example.com/paris.jpg',
        cityLatitude: 48.8566,
        cityLongitude: 2.3522,
      },
      {
        cityName: 'Lyon',
        description: 'Ville historique réputée pour sa gastronomie et son patrimoine Renaissance',
        imageUrl: 'https://example.com/lyon.jpg',
        cityLatitude: 45.7640,
        cityLongitude: 4.8357,
      },
      {
        cityName: 'Marseille',
        description: 'Port méditerranéen multiculturel, porte d\'entrée vers la Provence',
        imageUrl: 'https://example.com/marseille.jpg',
        cityLatitude: 43.2965,
        cityLongitude: 5.3698,
      },
      {
        cityName: 'Toulouse',
        description: 'La ville rose, capitale européenne de l\'aéronautique et du spatial',
        imageUrl: 'https://example.com/toulouse.jpg',
        cityLatitude: 43.6047,
        cityLongitude: 1.4442,
      }
    ]);

    console.log(`✅ Created ${cities.length} cities`);

    // 5. Create POIs
    console.log('📍 Creating points of interest...');
    const pois = [
      // Paris POIs
      {
        poiName: 'Tour Eiffel',
        address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
        poiLatitude: 48.8584,
        poiLongitude: 2.2945,
        imageUrl: 'https://example.com/tour-eiffel.jpg',
        poiDescription: 'Monument emblématique de Paris',
        externalLink: 'https://www.toureiffel.paris/',
        poiCity: cities.find(c => c.cityName === 'Paris')!,
        poiCategory: categories.find(c => c.categoryName === 'Attraction')!,
      },
      {
        poiName: 'Le Louvre',
        address: 'Rue de Rivoli, 75001 Paris',
        poiLatitude: 48.8606,
        poiLongitude: 2.3376,
        imageUrl: 'https://example.com/louvre.jpg',
        poiDescription: 'Musée d\'art le plus visité au monde',
        externalLink: 'https://www.louvre.fr/',
        poiCity: cities.find(c => c.cityName === 'Paris')!,
        poiCategory: categories.find(c => c.categoryName === 'Attraction')!,
      },
      {
        poiName: 'Restaurant Le Procope',
        address: '13 Rue de l\'Ancienne Comédie, 75006 Paris',
        poiLatitude: 48.8534,
        poiLongitude: 2.3387,
        imageUrl: 'https://example.com/procope.jpg',
        poiDescription: 'Restaurant historique parisien',
        externalLink: 'https://procope.com/',
        poiCity: cities.find(c => c.cityName === 'Paris')!,
        poiCategory: categories.find(c => c.categoryName === 'Restaurant')!,
      },
      // Lyon POIs
      {
        poiName: 'Basilique Notre-Dame de Fourvière',
        address: '8 Pl. de Fourvière, 69005 Lyon',
        poiLatitude: 45.7624,
        poiLongitude: 4.8227,
        imageUrl: 'https://example.com/fourviere.jpg',
        poiDescription: 'Basilique perchée sur la colline de Fourvière',
        externalLink: 'https://www.fourviere.org/',
        poiCity: cities.find(c => c.cityName === 'Lyon')!,
        poiCategory: categories.find(c => c.categoryName === 'Attraction')!,
      },
      {
        poiName: 'Bouchon Lyonnais',
        address: '20 Rue Saint-Jean, 69005 Lyon',
        poiLatitude: 45.7640,
        poiLongitude: 4.8277,
        imageUrl: 'https://example.com/bouchon.jpg',
        poiDescription: 'Restaurant traditionnel lyonnais',
        externalLink: 'https://bouchon-lyon.fr/',
        poiCity: cities.find(c => c.cityName === 'Lyon')!,
        poiCategory: categories.find(c => c.categoryName === 'Restaurant')!,
      },
      // Marseille POIs
      {
        poiName: 'Vieux-Port de Marseille',
        address: 'Quai du Port, 13002 Marseille',
        poiLatitude: 43.2951,
        poiLongitude: 5.3756,
        imageUrl: 'https://example.com/vieux-port.jpg',
        poiDescription: 'Port historique de Marseille',
        externalLink: 'https://www.marseille-tourisme.com/',
        poiCity: cities.find(c => c.cityName === 'Marseille')!,
        poiCategory: categories.find(c => c.categoryName === 'Attraction')!,
      },
      {
        poiName: 'Bouillabaisse Chez Fonfon',
        address: '140 Rue du Vallon des Auffes, 13007 Marseille',
        poiLatitude: 43.2844,
        poiLongitude: 5.3556,
        imageUrl: 'https://example.com/fonfon.jpg',
        poiDescription: 'Restaurant spécialisé en bouillabaisse',
        externalLink: 'https://chez-fonfon.com/',
        poiCity: cities.find(c => c.cityName === 'Marseille')!,
        poiCategory: categories.find(c => c.categoryName === 'Restaurant')!,
      },
      // Toulouse POIs
      {
        poiName: 'Capitole de Toulouse',
        address: 'Pl. du Capitole, 31000 Toulouse',
        poiLatitude: 43.6045,
        poiLongitude: 1.4440,
        imageUrl: 'https://example.com/capitole.jpg',
        poiDescription: 'Hôtel de ville et théâtre de Toulouse',
        externalLink: 'https://www.toulouse.fr/',
        poiCity: cities.find(c => c.cityName === 'Toulouse')!,
        poiCategory: categories.find(c => c.categoryName === 'Attraction')!,
      }
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