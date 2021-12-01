import React from 'react'
import { SvgXml } from 'react-native-svg'

export default ({ width }) => {
  const svgMarkup = `
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="21.5" cy="21.5" r="21.5" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.5 38.2791C30.7669 38.2791 38.2791 30.7669 38.2791 21.5C38.2791 12.2331 30.7669 4.72093 21.5 4.72093C12.2331 4.72093 4.72093 12.2331 4.72093 21.5C4.72093 30.7669 12.2331 38.2791 21.5 38.2791ZM21.5 40C31.7172 40 40 31.7172 40 21.5C40 11.2827 31.7172 3 21.5 3C11.2827 3 3 11.2827 3 21.5C3 31.7172 11.2827 40 21.5 40Z" fill="#FFC814" fill-opacity="0.88"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.8625 15.1471H12.1375V27.8529H30.8625V15.1471ZM11 14V29H32V14H11Z" fill="#FFC814" fill-opacity="0.88"/>
<path d="M16.86 19.0766L11.0781 25.0437C11.0282 25.0952 11 25.1662 11 25.2403V27.7268C11 27.8777 11.1144 28 11.2554 28H30.7441C30.9812 28 31.0903 27.6846 30.9103 27.5195L23.2512 20.4933C23.1512 20.4015 23.0023 20.4062 22.9075 20.5041L20.9301 22.5448C20.8311 22.647 20.6743 22.647 20.5753 22.5448L17.2147 19.0766C17.1158 18.9745 16.959 18.9745 16.86 19.0766Z" fill="#FFC814" fill-opacity="0.88"/>
</svg>

  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width={width} />

  return <SvgImage />
}
