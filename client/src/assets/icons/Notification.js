import React from 'react'
import { SvgXml } from 'react-native-svg'

export default ({ width }) => {
  const svgMarkup = `
<svg width="151" height="154" viewBox="0 0 151 154" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M76.5729 154C70.8556 154.004 65.3058 152.074 60.8294 148.527C56.353 144.979 53.2144 140.022 51.926 134.465H19.7685C14.5256 134.465 9.49739 132.388 5.79008 128.69C2.08278 124.992 0 119.976 0 114.746C0 109.516 2.08278 104.5 5.79008 100.802C9.49739 97.1041 14.5256 95.0265 19.7685 95.0265C21.42 95.0245 23.0032 94.3692 24.171 93.2043C25.3388 92.0394 25.9957 90.4601 25.9978 88.8127V63.403C25.9911 54.8279 28.2278 46.3993 32.4867 38.9505C36.7456 31.5017 42.8794 25.2904 50.2819 20.9304C51.0875 15.2378 53.8878 10.0136 58.1864 6.18408C62.4849 2.35451 68.004 0.166935 73.7652 0.00917005C79.5264 -0.148595 85.1575 1.73363 89.6602 5.32219C94.1629 8.91074 97.2463 13.9738 98.3638 19.6137C106.381 23.8004 113.1 30.0919 117.794 37.8091C122.489 45.5264 124.981 54.3761 125.002 63.403V88.8127C125.004 90.4601 125.661 92.0394 126.829 93.2043C127.997 94.3692 129.58 95.0245 131.232 95.0265C136.474 95.0265 141.503 97.1041 145.21 100.802C148.917 104.5 151 109.516 151 114.746C151 119.976 148.917 124.992 145.21 128.69C141.503 132.388 136.474 134.465 131.232 134.465H101.189C99.9018 140.017 96.7678 144.97 92.2978 148.517C87.8277 152.064 82.285 153.997 76.5729 154ZM69.7493 134.465C70.5824 135.463 71.6251 136.265 72.8036 136.816C73.9822 137.366 75.2677 137.652 76.5691 137.652C77.8705 137.652 79.156 137.366 80.3345 136.816C81.513 136.265 82.5558 135.463 83.3889 134.465H69.7493ZM75.5 30.3782C66.7237 30.3985 58.3127 33.8853 52.1069 40.0757C45.9011 46.2661 42.4057 54.6562 42.3853 63.4108V88.8204C42.3792 94.802 39.9943 100.537 35.7542 104.766C31.5141 108.996 25.765 111.375 19.7685 111.381C18.8718 111.381 18.0118 111.736 17.3778 112.369C16.7437 113.001 16.3876 113.859 16.3876 114.754C16.3876 115.648 16.7437 116.506 17.3778 117.138C18.0118 117.771 18.8718 118.126 19.7685 118.126H131.232C132.128 118.126 132.988 117.771 133.622 117.138C134.256 116.506 134.612 115.648 134.612 114.754C134.612 113.859 134.256 113.001 133.622 112.369C132.988 111.736 132.128 111.381 131.232 111.381C125.235 111.375 119.486 108.996 115.246 104.766C111.006 100.537 108.621 94.802 108.615 88.8204V63.4108C108.594 54.6562 105.099 46.2661 98.8931 40.0757C92.6873 33.8853 84.2763 30.3985 75.5 30.3782Z" fill="#231F20"/>
</svg>
`
  const SvgImage = () => <SvgXml xml={svgMarkup} width={width} />

  return <SvgImage />
}
