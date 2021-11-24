import React from 'react'
import { SvgXml } from 'react-native-svg'

export default ({ width }) => {
  const svgMarkup = `
<svg width="187" height="166" viewBox="0 0 187 166" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M49 75.2166C45.2536 75.2166 42.2166 78.2537 42.2166 82C42.2166 85.7463 45.2537 88.7834 49 88.7834C52.7463 88.7834 55.7834 85.7463 55.7834 82C55.7834 78.2537 52.7464 75.2166 49 75.2166ZM25 82C25 68.7451 35.7452 58 49 58C62.2548 58 73 68.7452 73 82C73 95.2548 62.2548 106 49 106C35.7452 106 25 95.2548 25 82Z" fill="#231F20"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M49 135C53.9706 135 58 138.871 58 143.647V157.353C58 162.129 53.9706 166 49 166C44.0294 166 40 162.129 40 157.353V143.647C40 138.871 44.0294 135 49 135Z" fill="#231F20"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.5661 128.418C28.8221 128.418 27.0951 128.764 25.4838 129.437C23.8725 130.109 22.4086 131.095 21.1756 132.338C19.9426 133.581 18.9647 135.056 18.2977 136.68C17.6308 138.303 17.2878 140.043 17.2885 141.8L17.2885 162H1.22427e-06L2.04865e-06 141.807L1.22427e-06 141.805V141.804C-0.00113477 137.76 0.788308 133.755 2.32325 130.019C3.85864 126.281 6.10988 122.885 8.94835 120.024C11.7868 117.163 15.157 114.894 18.8662 113.345C22.5754 111.797 26.5511 111 30.5661 111H67.4339C71.4489 111 75.4246 111.797 79.1338 113.345C82.8431 114.894 86.2132 117.163 89.0516 120.024C91.8901 122.885 94.1414 126.281 95.6768 130.019C97.2117 133.755 98.0011 137.76 98 141.804V141.807V162H80.7115V141.8C80.7122 140.043 80.3692 138.303 79.7023 136.68C79.0353 135.056 78.0574 133.581 76.8244 132.338C75.5914 131.095 74.1274 130.109 72.5162 129.437C70.9049 128.764 69.1779 128.418 67.4339 128.418H30.5661Z" fill="#231F20"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M125.376 15.8378C117.927 15.8378 111.888 21.1842 111.888 27.7795V79.2205C111.888 85.8158 117.927 91.1622 125.376 91.1622H155.624C163.073 91.1622 169.112 85.8158 169.112 79.2205V27.7795C169.112 21.1842 163.073 15.8378 155.624 15.8378H125.376ZM94 27.7795C94 12.4373 108.047 0 125.376 0H155.624C172.953 0 187 12.4373 187 27.7795V79.2205C187 94.5627 172.953 107 155.624 107H125.376C108.047 107 94 94.5627 94 79.2205V27.7795Z" fill="#231F20"/>
</svg>
`
  const SvgImage = () => <SvgXml xml={svgMarkup} width={width} />

  return <SvgImage />
}
