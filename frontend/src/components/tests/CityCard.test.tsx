import { describe, it, expect, vi, afterEach } from "vitest";
import type { City } from "../../generated/graphql-types";
import CityCard from "../CityCard";
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

const cityCard: City = {
	cityId: 1,
	cityName: "Test1",
	imageUrl: "image1.png",
	description: "Ceci est une ville de test 1",
	cityLatitude: 1,
	cityLongitude: 2
}

describe('Test unitaire du composant CityCard', () => {

	  // Nettoyer les mocks après chaque test
    afterEach(() => {
        vi.restoreAllMocks();
    });

	it('on check que les informations de la cards affichées sont correctes', () => {
		render(
			<MemoryRouter>
				<CityCard city={cityCard}/>
			</MemoryRouter>
		)

        // Vérifier l'image par son alt text
        const image = screen.getByAltText('Test1');
        expect(image).toHaveAttribute('src', 'image1.png');
        
        // Vérifier le titre
        expect(screen.getByText('Test1')).toBeInTheDocument();
        
        // Vérifier la description
        expect(screen.getByText('Ceci est une ville de test 1')).toBeInTheDocument();

	})

	  it('navigue vers la bonne URL au click', () => {
        render(
            <MemoryRouter>
                <CityCard city={cityCard}/>
            </MemoryRouter>
        )

        // Click sur la card
        const card = screen.getByText('Test1').closest('.cityCard'); 
		expect(card).toBeInTheDocument()
        fireEvent.click(card!);

        // Vérifier que navigate a été appelé avec la bonne URL
        expect(mockNavigate).toHaveBeenCalledWith('/city/1');
    })
})