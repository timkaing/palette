/**
 * Checks to see if a URL is malformed
 * @param {string} url - The url.
 * @return {Object} The URL object.
 */
export const parseAndValidateLink = (url) => {
    try {
        const urlObject = new URL(url)
        return urlObject
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
export const setPaletteParams = (urlObject) => {
    urlObject.searchParams.append('palette', 'json')
    const linkWithParams = urlObject.toString()
    return linkWithParams
}

/**
 * Asynchronously requests for a resource
 * @param {string} url - The url of the resource.
 * @return {Object} The response in JSON format.
 */
export const getImage = async (url) => {
    try {
        const response = await fetch(url)
        const image = await response.json()
        return image
    } catch (e) {
        return null
    }
}
