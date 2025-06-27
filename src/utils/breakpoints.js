// theme.js 또는 utils/breakpoints.js
import { css } from 'styled-components'

const sizes = { mobile: 640, tablet: 767, notebook: 1024, desktop: 1440, letina: 2560 }

export const media = Object.fromEntries(
  Object.entries(sizes).map(([k, v]) => [
    k,
    (...args) => css`
      @media (min-width: ${v}px) {
        ${css(...args)}
      }
    `,
  ]),
)
export default media
