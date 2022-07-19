# Palette Functions

# Description
A JavaScript library that leverages Imgix's `?palette` parameter to expose two functions:

1. Returns the color of a given imgix-served image
2. Determines a suitable color for overlaid text on a given imgix-served image
   1. A suitable color is determined by...

*An image can be served on Imgix by creating a [Source](https://docs.imgix.com/setup/creating-sources), which connects imgix to your asset storage. More information about Imgix's Palette Parameter can be found [**here**.](https://docs.imgix.com/apis/url/color-palette/palette)*

---

## Installation

### Testing Locally
1. Clone the repository:
   1. `git clone git@github.com:timkaing/palette.git`
2. Install project dependencies:
   1. `yarn`

### Testing via NPM
1. Install the package:
   1. `npm i tk-palette`
2. In your file of choice, explicitly specify the filename in your import
   1. `import {colorPalette, colorOverlay} from './node_modules/tk-palette/src/index.js'`
      1. Not doing so may result in an [import error](https://bobbyhadz.com/blog/node-js-error-err-unsupported-dir-import).
---

# Usage
Run the runner file in the root directory to see the sample output of the exposed functions:
```
node src/runner.js
```
Expected Output:
```
IMAGE URL: https://assets.imgix.net/unsplash/bridge.jpg

SUITABLE COLOR FOR TEXT OVERLAY: #ffffff

GENERATED COLOR PALETTE: {"colors":[{"red":0.980392,"hex":"#fa9e5a","blue":0.352941,"green":0.619608},{"red":0.282353,"hex":"#48abe6","blue":0.901961,"green":0.670588},{"red":0.219608,"hex":"#389cd3","blue":0.827451,"green":0.611765},{"red":0.0156863,"hex":"#0483bc","blue":0.737255,"green":0.513725},{"red":0.643137,"hex":"#a45f59","blue":0.34902,"green":0.372549},{"red":0.560784,"hex":"#8f1613","blue":0.0745098,"green":0.0862745}],"average_luminance":0.375264,"dominant_colors":{"vibrant":{"red":0.027451,"hex":"#0789c5","blue":0.772549,"green":0.537255},"muted_light":{"red":0.698039,"hex":"#b2a4b1","blue":0.694118,"green":0.643137},"muted":{"red":0.643137,"hex":"#a45f59","blue":0.34902,"green":0.372549},"vibrant_dark":{"red":0.00784314,"hex":"#027ab5","blue":0.709804,"green":0.478431},"vibrant_light":{"red":0.980392,"hex":"#fa9e5a","blue":0.352941,"green":0.619608},"muted_dark":{"red":0.207843,"hex":"#354e60","blue":0.376471,"green":0.305882}}}
```

# Functions

## Color Palette
### Returns the color palette an image
> Leverage Imgix's Palette Parameter (Rendering API) to generate a color palette of an imgix-served image. Two palette sets are generated; one based on frequency and the other on dominance of the image's colors.

### Example(s):
```JavaScript
// await syntax
const palette = await colorPalette('imgix-served-url')

// then syntax
colorPalette('imgix-served-url').then(res => console.log(res))
```
Input: https://assets.imgix.net/unsplash/bridge.jpg

Expected Output:
```
{
  colors: [
    { red: 0.980392, hex: '#fa9e5a', blue: 0.352941, green: 0.619608 },
    { red: 0.282353, hex: '#48abe6', blue: 0.901961, green: 0.670588 },
    { red: 0.219608, hex: '#389cd3', blue: 0.827451, green: 0.611765 },
    { red: 0.0156863, hex: '#0483bc', blue: 0.737255, green: 0.513725 },
    { red: 0.643137, hex: '#a45f59', blue: 0.34902, green: 0.372549 },
    {
      red: 0.560784,
      hex: '#8f1613',
      blue: 0.0745098,
      green: 0.0862745
    }
  ],
  average_luminance: 0.375264,
  dominant_colors: {
    vibrant: { red: 0.027451, hex: '#0789c5', blue: 0.772549, green: 0.537255 },
    muted_light: { red: 0.698039, hex: '#b2a4b1', blue: 0.694118, green: 0.643137 },
    muted: { red: 0.643137, hex: '#a45f59', blue: 0.34902, green: 0.372549 },
    vibrant_dark: {
      red: 0.00784314,
      hex: '#027ab5',
      blue: 0.709804,
      green: 0.478431
    },
    vibrant_light: { red: 0.980392, hex: '#fa9e5a', blue: 0.352941, green: 0.619608 },
    muted_dark: { red: 0.207843, hex: '#354e60', blue: 0.376471, green: 0.305882 }
  }
}
```

--- 

## Color Overlay
Returns a suitable color for overlaid text based on a given image's palette. Black or White text is determined by the `average_luminance` of the image. A lighter image will benefit from dark text whereas a darker will beneit from light text.
> Utilize the generated color palette to find the optimal text color to place on top of an image. Using a suitable color improves user acessibility when reading the text on an image.

For more details on best practices when working with text over images, see Nielsan Norman Group's Article [here](https://www.nngroup.com/articles/text-over-images/).

### Example(s):
```JavaScript
// await syntax
const overlay = await colorOverlay('imgix-served-url')

// then syntax
colorOverlay('imgix-served-url').then(res => console.log(res))
```

Input: https://assets.imgix.net/unsplash/bridge.jpg

Expected Output:
```CSS
/* average_luminance < 0.5 -- returns white */
#ffffff
```

--- 

# Testing
To run tests, run the following command:
```
yarn test
```
Example of a passing test:
```
---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------|---------|----------|---------|---------|-------------------
All files      |   96.87 |       50 |   83.33 |   96.87 |                   
 src           |   96.15 |       50 |     100 |   96.15 |                   
  helper.js    |   93.75 |      100 |     100 |   93.75 | 38                
  index.js     |     100 |       50 |     100 |     100 | 33                
 tests         |     100 |      100 |       0 |     100 |                   
  constants.js |     100 |      100 |       0 |     100 |                   
---------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        0.377 s, estimated 1 s
```

---
# Notes

1. How did you determine the best color for text overlay?
- There were a few things methods I thought about when coming to my current solution.
  - The first choice was to take the inverse of the dominant colors. I though that taking the opposite of the most dominant color would provide the most contrast and make the text legible. I tried inversing when a palette was [*one color*](https://assets.imgix.net/unsplash/bridge.jpg?palette=json&colors=1) as well as a [*six color*](https://assets.imgix.net/unsplash/bridge.jpg?palette=json&colors=6) palette (default). This led to poor results with an image containing one or two primary colors to be the inverse of one another (ex. a chess board).
    - Here is Brandwood's tool on testing text on background images (a11y): https://www.brandwood.com/a11y/
  - Looking at the information provided by the `palette` parameter, what made the most sense for me was to use the `average_luminance` and determine a color (black or white) based on the brightness of an image. I believe that typically in best practices, text over images is often avoided, but when necessary a darker overlay is cast upon the image.
    - Imgix's Rendering API contains `blend` and `txt` which can help achieve this desired look! See more [*here*](https://docs.imgix.com/apis/rendering/blending/blend#text)!
2. How would you improve upon your current library?
- I want to give the option to users to select the number of colors returned in their palette as well as the format (currently JSON).
  - Palette currently supports the ability to select a number of colors (0-16; default: 6)
  - Palette supports output in both JSON and CSS.
    - I went with JSON because of how it would be used to determine the text overlay's color.   
- Adding workflow status badges

---

# Licenses
```
Copyright 2022 Timothy Kaing

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
