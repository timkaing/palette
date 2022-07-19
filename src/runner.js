import { IMGIX_URL } from '../tests/constants.js'
import { colorOverlay, colorPalette } from './index.js'

Promise.all([colorOverlay(IMGIX_URL), colorPalette(IMGIX_URL)]).then((res) =>
    console.log(
        `\nIMAGE URL: ${IMGIX_URL}\n\nSUITABLE COLOR FOR TEXT OVERLAY: ${
            res[0]
        }\n\nGENERATED COLOR PALETTE: ${JSON.stringify(res[1])}`
    )
)
