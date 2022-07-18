/**
 * Checks to see if a URL is malformed
 * @param {string} url - The url.
 * @return {Object} The URL object.
 */
 const parseAndValidateLink = url => {
    try {
        const urlObject = new URL(url);
        return urlObject;
    } catch (error) {
        console.error(`The provided link is invalid: ${url}`)
        throw error
    }
}

/**
 * Sets parameter to leverage Imigix's collor palette extraction
 * @param {Object} urlObject - The url object of the image.
 * @return {string} The url with given search parameters.
 */
const setPaletteParams = urlObject => {
    urlObject.searchParams.set("palette", "json")
    const linkWithParams = urlObject.href
    return linkWithParams
}

/**
 * Asynchronously requests for a resource
 * @param {string} url - The url of the resource.
 * @return {Object} The response in JSON format.
 */
const getImage = async url => {
  const response = await fetch(url)

  if (!response.ok) {
    const message = `Error: ${response.status}`
    throw new Error(message)
  }

  const image = await response.json();

  return image
}

/**
 * Generates a "Color Palette" of a given Imigix-served image
 * @param {string} url - The url of the image.
 * @return {Object} the color palette of an image as a JSON object with default parameters.
 */
const colorPalette = async (url) => {

    // initialize a valid image
    const validImage = parseAndValidateLink(url)

    // append the `palette` parameter to the image url
    const palletteImageURL = setPaletteParams(validImage)

    // extracts a palette of color values from an image (render api)
    const palette = await getImage(palletteImageURL)

    return palette

}

/**
 * Determines a suitable overlay text color of a given Imgix-served image
 * @param {string} url - The url of the image.
 * @return {string} the suitable overlay text color as a hexadecimal color value.
 */
const colorOverlay = async (url) => {
    
    // generate color palette
    let palette = await colorPalette(url)

    let averageLuminance = palette.average_luminance
  
    // if luminance is less than 0.5 (darker image) use white text, otherwise use black text
    const overlayColor = (averageLuminance < 0.5) ? "#ffffff" : "#000000"

    return overlayColor

}

export { colorPalette, colorOverlay }