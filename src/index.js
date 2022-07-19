import { parseAndValidateLink, setPaletteParams, getImage } from './helper.js'

/**
 * Generates a "Color Palette" of a given Imigix-served image
 * @param {string} url - The url of the image.
 * @return {Object} the color palette of an image as a JSON object with default parameters.
 */
export const colorPalette = async (url) => {
    // initialize a valid image
    const validImage = parseAndValidateLink(url)

    // append the `palette` parameter to the image url
    const paletteImageURL = setPaletteParams(validImage)

    // extracts a palette of color values from an image (render api)
    const palette = await getImage(paletteImageURL)

    return palette
}

/**
 * Determines a suitable overlay text color of a given Imgix-served image
 * @param {string} url - The url of the image.
 * @return {string} the suitable overlay text color as a hexadecimal color value.
 */
export const colorOverlay = async (url) => {
    // generate color palette
    let palette = await colorPalette(url)

    let averageLuminance = palette.average_luminance

    // if luminance is less than 0.5 (darker image) use white text, otherwise use black text
    const overlayColor = averageLuminance < 0.5 ? '#ffffff' : '#000000'

    return overlayColor
}
