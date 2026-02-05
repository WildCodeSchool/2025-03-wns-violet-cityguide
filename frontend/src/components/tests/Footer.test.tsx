
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Footer from "../Footer";
import { fireEvent, render, screen } from "@testing-library/react";

/**
 * Ce qu'il faut tester 
 * L'affichage de mention légale 
 * - Mène à la page legalNotice
 * L'affichage de FAQ
 * - Mène à la Faq
 */

describe('test unitaire du composant Footer', () => {

	it('L\'affichage et la redirection des "Mentions Légales"', () => {
		render(
			<MemoryRouter>
				<Footer />
			</MemoryRouter>
		)

		const mentionLegale = screen.getByText('Mentions légales')
		expect(mentionLegale).toBeInTheDocument(); 
		expect(mentionLegale).toHaveAttribute('href', '/legalNotice');
	})

	it('L\'affichage et la redirection de la "FAQ"', () => {
		render(
			<MemoryRouter>
				<Footer />
			</MemoryRouter>
		)

		const faq = screen.getByText('FAQ')
		expect(faq).toBeInTheDocument(); 
		expect(faq).toHaveAttribute('href', '/faq');
	})
})

