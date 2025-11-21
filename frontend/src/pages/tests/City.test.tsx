import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import City from '../City'

describe('City', () => {
    it('rend le composant City avec une image de la ville', () => {
        const html = renderToString(
            <MemoryRouter>
                <City />
            </MemoryRouter>
        )

        // espère voir l'image s'afficher et contient un alt
        expect(html).toContain('<img')
        expect(html).toContain('alt=""')
    })
});