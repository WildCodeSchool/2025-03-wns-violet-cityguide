import { afterEach, describe, expect, it, vi } from "vitest"
import SearchBar from "../SearchBar"
import type { City } from "../../generated/graphql-types"
import type { CityType } from "../../pages/City";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; 

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

const testCityCards = [
	{
		cityId: 1,
		cityName: "AbcTest1",
		imageUrl: "image1.png",
		description: "Ceci est une ville de test 1",
		cityLatitude: 1,
		cityLongitude: 2
	},
	{
		cityId: 2,
		cityName: "DefTest2",
		imageUrl: "image2.png",
		description: "Ceci est une ville de test 2",
		cityLatitude: 2,
		cityLongitude: 3
	},
	{
		cityId: 3,
		cityName: "GhiTest3",
		imageUrl: "image3.png",
		description: "Ceci est une ville de test 3",
		cityLatitude: 3,
		cityLongitude: 4
	},
	{
		cityId: 4,
		cityName: "JklTest4",
		imageUrl: "image4.png",
		description: "Ceci est une ville de test 4",
		cityLatitude: 4,
		cityLongitude: 5
	},
	{
		cityId: 5,
		cityName: "MnoTest5",
		imageUrl: "image5.png",
		description: "Ceci est une ville de test 5",
		cityLatitude: 5,
		cityLongitude: 6
	},
	{
		cityId: 6,
		cityName: "PqrTest6",
		imageUrl: "image6.png",
		description: "Ceci est une ville de test 6",
		cityLatitude: 6,
		cityLongitude: 7
	},
	{
		cityId: 7,
		cityName: "StuTest7",
		imageUrl: "image7.png",
		description: "Ceci est une ville de test 7",
		cityLatitude: 7,
		cityLongitude: 8
	}
]

/**
 *Ce que je veux tester : 
 - que le message d'erreur apparait si pas de villes dans la liste 
 - Que la liste prédise le nom de ville charge les bons noms 
 - que le filtre de city fonctionne correctement 
 - que le formulaire soit correctement envoyé
 - vérifier les fonctions sur le input 
 */

describe('Test unitaire du composant SearchBar', () => {

	//On mock useNavigate
	const navigate = mockNavigate

	//fonction implémentée sur la HomePage et utilisée dans la searchBar
	const handleSelectCity = (city: CityType) => {
		navigate(`/city/${city.cityId}`);
	};

	// On nettoie les mocks après chaque tests
	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('Le message d\'erreur s\'affiche si pas de ville à charger dans la liste', () => {

		// On fait un mock data d'array vide
		const noCity: Array<City> = []

		const { container }  = render(
			<MemoryRouter>
				<SearchBar
					cities={noCity}
					onSelectCity={handleSelectCity}
					errorMessage={"Aucune ville trouvée"}
				/>
			</MemoryRouter>
		)

		// on sélectionne l'input 
		const cityInput = screen.getByPlaceholderText('Rechercher une ville...'); 
		
		// on vérifie que la liste de villes ne s'affiche pas si aucune valeure est entrée
		const verifyNoMsg = container.querySelector('.city__search__list')
		expect(verifyNoMsg).toBeNull()
		
		// on entre 'abc' dans l'input
		fireEvent.change(cityInput, {
			target: {
				value: "abc"
			}
		})
		
		// on s'attends à ce que l'input enregistre notre précédente entrée
		expect(cityInput).toHaveValue('abc'); 
		
		// On vérifie que le message affiché nous informe effectivement qu'aucunes villes a été trouvée
		const errorMsg = screen.getByText('Aucune ville trouvée')
		expect(errorMsg).toBeInTheDocument()
	})

	it('La liste de ville proposée est correcte', () => {

		render(
			<MemoryRouter>
				<SearchBar
					cities={testCityCards}
					onSelectCity={handleSelectCity}
					errorMessage={"Aucune ville trouvée"}
				/>
			</MemoryRouter>
		)

		const cityInput = screen.getByPlaceholderText('Rechercher une ville...'); 

		fireEvent.change(cityInput, {
			target: {
				value: "Test"
			}
		})

		expect(cityInput).toHaveValue('Test'); 

		const cityName = screen.getAllByRole('listitem'); 
		expect(cityName).toHaveLength(7)

		expect(screen.getByText('AbcTest1')).toBeInTheDocument();
		expect(screen.getByText('DefTest2')).toBeInTheDocument();
		expect(screen.getByText('GhiTest3')).toBeInTheDocument();
		expect(screen.getByText('JklTest4')).toBeInTheDocument();
		expect(screen.getByText('MnoTest5')).toBeInTheDocument();
		expect(screen.getByText('PqrTest6')).toBeInTheDocument();
		expect(screen.getByText('StuTest7')).toBeInTheDocument();

	})

	it('La ville affichée dans la liste est la bonne', () => {

		const { container } = render(
			<MemoryRouter>
				<SearchBar
					cities={testCityCards}
					onSelectCity={handleSelectCity}
					errorMessage={"Aucune ville trouvée"}
				/>
			</MemoryRouter>
		)

		const cityInput = screen.getByPlaceholderText('Rechercher une ville...'); 

		fireEvent.change(cityInput, {
			target: {
				value: "abc"
			}
		})

		expect(cityInput).toHaveValue('abc'); 

		const cityList = container.querySelectorAll('.city__search__list')

		expect(cityList[0]).toHaveTextContent('AbcTest1')
	})
})
