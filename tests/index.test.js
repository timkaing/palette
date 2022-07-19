import { colorOverlay, colorPalette } from '../src'
import { BLACK, IMGIX_URL, WHITE } from './constants'

describe('Palette Function Tests', () => {
    describe('colorOverlay()', () => {
        it('determines black(#ffffff) as a suitable color for a dark image', async () => {
            const overlay = await colorOverlay(IMGIX_URL)
            expect(overlay).toBe(WHITE)
            expect(overlay).not.toBe(BLACK)
        })
        // When Luminance > 0.5 (no image provided)
        // it('determines black(#000000) as a suitable color for a light image', async () => {
        //     const overlay = await colorOverlay(IMGIX_URL)
        //     expect(overlay).toBe(BLACK)
        //     expect(overlay).not.toBe(WHITE)
        // })
    })
    describe('colorPalette()', () => {
        it('generates a palette based on a given url', async () => {
            const palette = await colorPalette(IMGIX_URL)
            expect(palette.average_luminance).toEqual(0.375264)
            expect(palette).toEqual(
                expect.objectContaining({
                    colors: expect.any(Object),
                    average_luminance: expect.any(Number),
                    dominant_colors: expect.any(Object),
                })
            )
        })
    })
})
