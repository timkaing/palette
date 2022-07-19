import { getImage, setPaletteParams, parseAndValidateLink } from '../src/helper'
import {
    IMAGE_WITH_PARAMS,
    IMGIX_URL,
    INVALID_URL,
    mockUrlObject,
} from './constants'
const mockImage = require('./imageResponse.json')

//
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ mockImage }),
    })
)

beforeEach(() => {
    fetch.mockClear()
})

describe('Helper Function Tests', () => {
    describe('parseAndValidateLink()', () => {
        it('processes a valid link', () => {
            expect(parseAndValidateLink(IMGIX_URL)).toEqual(
                expect.objectContaining({ href: expect.any(String) })
            )
        })
        it('throws an error with an invalid link', () => {
            expect(() => parseAndValidateLink(INVALID_URL)).toThrow(
                TypeError('Invalid URL')
            )
        })
    })
    describe('setPaletteParams()', () => {
        it('sucessfuly sets palette parameters', () => {
            jest.spyOn(mockUrlObject, 'toString').mockImplementation(
                () => IMAGE_WITH_PARAMS
            )
            expect(setPaletteParams(mockUrlObject)).toContain('palette')
        })
    })
    describe('getImage()', () => {
        it('sucessfully requests the resources of an image', async () => {
            const data = await getImage(IMGIX_URL)
            expect(data).toEqual(
                expect.objectContaining({
                    mockImage: expect.objectContaining({
                        colors: expect.any(Array),
                        average_luminance: expect.any(Number),
                        dominant_colors: expect.any(Object),
                    }),
                })
            )
        })
    })
})
