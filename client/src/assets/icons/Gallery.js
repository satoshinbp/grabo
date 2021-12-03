import React from 'react'
import { SvgXml } from 'react-native-svg'

export default ({ width }) => {
  const svgMarkup = `
<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.8625 1.14706H1.13753V13.8529H19.8625V1.14706ZM0 0V15H21V0H0Z" fill="#FFC814" fill-opacity="0.88"/>
<path d="M5.86002 5.07663L0.0780673 11.0437C0.0281822 11.0952 0 11.1662 0 11.2403V13.7268C0 13.8777 0.114355 14 0.255428 14H19.7441C19.9812 14 20.0903 13.6846 19.9103 13.5195L12.2512 6.49331C12.1512 6.40152 12.0023 6.40617 11.9075 6.50406L9.93009 8.54481C9.83107 8.64698 9.67432 8.64698 9.5753 8.54481L6.21473 5.07663C6.11579 4.97446 5.95896 4.97446 5.86002 5.07663Z" fill="#FFC814" fill-opacity="0.88"/>
</svg>
`
  const SvgImage = () => <SvgXml xml={svgMarkup} width={width} />

  return <SvgImage />
}
