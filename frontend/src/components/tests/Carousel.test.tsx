import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import Carousel from "../Carousel";
import CityCard from "../CityCard";
import type { City } from "../../types/CityType";

const testCards: Array<City> = [
	{
		cityId: 1,
		cityName: "Test1",
		imageUrl: "image1.png",
		description: "Ceci est une ville de test 1",
		cityLatitude: 1,
		cityLongitude: 2
	},
	{
		cityId: 2,
		cityName: "Test2",
		imageUrl: "image2.png",
		description: "Ceci est une ville de test 2",
		cityLatitude: 2,
		cityLongitude: 3
	},
	{
		cityId: 3,
		cityName: "Test3",
		imageUrl: "image3.png",
		description: "Ceci est une ville de test 3",
		cityLatitude: 3,
		cityLongitude: 4
	},
	{
		cityId: 4,
		cityName: "Test4",
		imageUrl: "image4.png",
		description: "Ceci est une ville de test 4",
		cityLatitude: 4,
		cityLongitude: 5
	},
	{
		cityId: 5,
		cityName: "Test5",
		imageUrl: "image5.png",
		description: "Ceci est une ville de test 5",
		cityLatitude: 5,
		cityLongitude: 6
	},
	{
		cityId: 6,
		cityName: "Test6",
		imageUrl: "image6.png",
		description: "Ceci est une ville de test 6",
		cityLatitude: 6,
		cityLongitude: 7
	},
	{
		cityId: 7,
		cityName: "Test7",
		imageUrl: "image7.png",
		description: "Ceci est une ville de test 7",
		cityLatitude: 7,
		cityLongitude: 8
	},
]

describe('Test unitaire du composant Carousel', () => {
	/**
	 * Ce que j'aimerai tester :  
	 * - si total === 0
	 * => le message d'erreur est affiché au lieux du carousel 
	 * 
	 * - au click sur prev 
	 * => change le cardNumber 
	 * 
	 * - au click sur next 
	 * => change le cardNumber 
	 * 
	 * regarde la fonction : goTo
	 * => au click 
	 */

	// 

	it('Le message d \'erreur s\'affiche si le nombre total d\'élément a display est de 0', () => {
		const totalElementIsNull: Array<City> = []
		render(
			<MemoryRouter>
				<Carousel visibleCount={5}>
					{totalElementIsNull.map((currCity) => (
						<CityCard city={currCity} />))}
				</Carousel>
			</MemoryRouter>
		)

		const errorMsg = screen.getByText('Aucun élément à afficher.');
		expect(errorMsg).toBeInTheDocument();
	})

	it('au click sur prev, la cards change', () => {
		const { container } = render(
			<MemoryRouter>
				<Carousel visibleCount={5}>
					{testCards.map((currCity) => (
						<CityCard city={currCity} />))}
				</Carousel>
			</MemoryRouter>
		)

		const btnPrev = container.querySelector('.carousel__nav.carousel__nav--prev')
		expect(btnPrev).toBeInTheDocument();

		fireEvent.click(btnPrev!);

		expect(screen.getByText('Test7')).toBeInTheDocument();

	})

	it('au click sur next, la cards change', () => {
		const { container } = render(
			<MemoryRouter>
				<Carousel visibleCount={5}>
					{testCards.map((currCity) => (
						<CityCard city={currCity} />))}
				</Carousel>
			</MemoryRouter>
		)

		const btnNext = container.querySelector('.carousel__nav.carousel__nav--next')
		expect(btnNext).toBeInTheDocument();

		fireEvent.click(btnNext!);

		expect(screen.getByText('Test2')).toBeInTheDocument();

	})

	it('on test les dots, leur nombre, et si on click sur goTo', () => {
		render(
			<MemoryRouter>
				<Carousel visibleCount={5}>
					{testCards.map((currCity) => (
						<CityCard city={currCity} />))}
				</Carousel>
			</MemoryRouter>
		)

		// Get all dot buttons
		const dots = screen.getAllByRole('button').filter(btn =>
			btn.className.includes('carousel__dot')
		);

		// Il doit y avoir normalement 2 dots (Car on a 7 villes avec un visibleCount de 5)
		expect(dots).toHaveLength(3);

		// Le premier dots doit-être actif
		expect(dots[0]).toHaveClass('carousel__dot--active');
		expect(dots[1]).toBeInTheDocument();
		expect(dots[1]).toBeInTheDocument();

		fireEvent.click(dots[1]!);
		expect(dots[1]).toHaveClass('carousel__dot--active');
		expect(screen.getByText('Test7')).toBeInTheDocument()
	})
})