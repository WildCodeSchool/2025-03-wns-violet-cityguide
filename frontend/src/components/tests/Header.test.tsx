import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import Header from '../Header'

describe('Header', () => {
    it('rend le header avec un lien vers /signup', () => {
        const html = renderToString(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )

        // espère voir le header s'afficher
        expect(html).toContain('<header')
        expect(html.replaceAll('&#x27;', "'")).toContain("S'inscrire")
        expect(html).toContain('href="/signup"')
    })
});