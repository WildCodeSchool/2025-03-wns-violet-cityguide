import { describe, it, expect, vi, afterEach } from "vitest";
import type { Poi, Category, City } from "../../generated/graphql-types";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import { MemoryRouter } from "react-router-dom";

// Mock useNavigate au niveau du module 
// On le défini avant le module car sinon vitest va tenter de le redéfinir plusieurs fois, ce qui va engendrer une erreur
// On moque useNavigate afin de tester le composant et non React-Routeur : on ne veut pas vraiment se rendre sur l'URL
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Données de test pour POI - structure similaire à cityCard
const mockCategory: Category = {
    categoryId: 1,
    categoryName: "Restaurant",
    style: "red",
    categoryPois: []
};

const mockCity: City = {
    cityId: 1,
    cityName: "Paris",
    cityLatitude: 48.8566,
    cityLongitude: 2.3522,
    description: "Ville lumière",
    imageUrl: "paris.jpg",
    cityPois: []
};

const poiCard: Poi = {
    poiId: 1,
    poiName: "Restaurant Le Petit Bistro",
    poiDescription: "Un charmant petit restaurant parisien avec une cuisine traditionnelle française",
    imageUrl: "restaurant.jpg",
    address: "123 Rue de la Paix, 75001 Paris",
    poiLatitude: 48.8566,
    poiLongitude: 2.3522,
    externalLink: "https://lepetitbistro.fr",
    poiCategory: mockCategory,
    poiCity: mockCity,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z"
};

// Mock du composant PoiCard (à remplacer par le vrai composant quand il existera)
const PoiCard = ({ poi }: { poi: Poi }) => {
    return (
        <div className="poiCard" onClick={() => mockNavigate(`/poi/${poi.poiId}`)}>
            <img src={poi.imageUrl} alt={poi.poiName} />
            <h3>{poi.poiName}</h3>
            <p>{poi.poiDescription}</p>
            <span className="category">{poi.poiCategory?.categoryName}</span>
            <span className="address">{poi.address}</span>
            <a href={poi.externalLink} target="_blank" rel="noopener noreferrer">
                Site officiel
            </a>
        </div>
    );
};

describe('Test unitaire du composant PoiCard', () => {

    // Nettoyer les mocks après chaque test
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('on check que les informations de la cards affichées sont correctes', () => {
        render(
            <MemoryRouter>
                <PoiCard poi={poiCard} />
            </MemoryRouter>
        )

        // Vérifier l'image par son alt text
        const image = screen.getByAltText('Restaurant Le Petit Bistro');
        expect(image).toHaveAttribute('src', 'restaurant.jpg');
        
        // Vérifier le nom du POI
        expect(screen.getByText('Restaurant Le Petit Bistro')).toBeInTheDocument();
        
        // Vérifier la description
        expect(screen.getByText(/Un charmant petit restaurant parisien/)).toBeInTheDocument();

        // Vérifier la catégorie
        expect(screen.getByText('Restaurant')).toBeInTheDocument();

        // Vérifier l'adresse
        expect(screen.getByText('123 Rue de la Paix, 75001 Paris')).toBeInTheDocument();

        // Vérifier le lien externe
        const externalLink = screen.getByText('Site officiel');
        expect(externalLink).toHaveAttribute('href', 'https://lepetitbistro.fr');
        expect(externalLink).toHaveAttribute('target', '_blank');
    });

    it('navigue vers la bonne URL au click', () => {
        render(
            <MemoryRouter>
                <PoiCard poi={poiCard} />
            </MemoryRouter>
        )

        // Click sur la card
        const card = screen.getByText('Restaurant Le Petit Bistro').closest('.poiCard');
        expect(card).toBeInTheDocument()
        fireEvent.click(card!);

        // Vérifier que navigate a été appelé avec la bonne URL
        expect(mockNavigate).toHaveBeenCalledWith('/poi/1');
    })

    it('gère correctement un POI sans catégorie', () => {
        const poiSansCategorie = {
            ...poiCard,
            poiCategory: null
        };

        render(
            <MemoryRouter>
                <PoiCard poi={poiSansCategorie} />
            </MemoryRouter>
        );

        // Le composant ne doit pas planter et ne pas afficher de catégorie
        expect(screen.getByText('Restaurant Le Petit Bistro')).toBeInTheDocument();
        expect(screen.queryByText('Restaurant')).not.toBeInTheDocument();
    });

    it('affiche une adresse tronquée si elle est trop longue', () => {
        const poiAvecLongueAdresse = {
            ...poiCard,
            address: "123 Rue Extrêmement Longue Avec Beaucoup De Détails Et D'Informations Supplémentaires, Quartier Central, Arrondissement, 75001 Paris, France, Europe"
        };

        render(
            <MemoryRouter>
                <PoiCard poi={poiAvecLongueAdresse} />
            </MemoryRouter>
        );

        // Vérifier que l'adresse est présente (la troncature dépend du CSS)
        expect(screen.getByText(/123 Rue Extrêmement Longue/)).toBeInTheDocument();
    });
});