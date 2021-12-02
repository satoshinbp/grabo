import React from 'react'
import { SvgXml } from 'react-native-svg'

export default ({ width }) => {
  const svgMarkup = `
<svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.0695 13.5833C2.06906 13.712 2.07216 12.811 2.08811 8.17774C2.10406 3.54443 6.22742 2.14288 8.28711 2.02126L11.7621 2.03323L14.4648 2.04253" stroke="#010101" stroke-width="4"/>
<path d="M27.9346 2.08984C27.806 2.08596 28.7065 2.11311 33.3377 2.25272C37.969 2.39234 39.26 6.55164 39.3265 8.61384L39.2218 12.0873L39.1404 14.7888" stroke="#010101" stroke-width="4"/>
<path d="M39.1595 22.2732C39.1605 22.1445 39.1533 23.0454 39.1165 27.6786C39.0797 32.3118 34.95 33.6947 32.8898 33.8071L29.4149 33.7794L26.7122 33.7579" stroke="#010101" stroke-width="4"/>
<path d="M13.6507 33.7015C13.7794 33.7012 12.8785 33.7029 8.24514 33.7116C3.61182 33.7203 2.1879 29.6045 2.05511 27.5454L2.0482 24.0705L2.04283 21.3677" stroke="#010101" stroke-width="4"/>
<circle cx="20.9729" cy="18.6685" r="6.8361" transform="rotate(0.197222 20.9729 18.6685)" fill="black" stroke="black"/>
</svg>
`
  const SvgImage = () => <SvgXml xml={svgMarkup} width={width} />

  return <SvgImage />
}
