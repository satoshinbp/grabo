import React from 'react'
import { SvgXml } from 'react-native-svg'

export default ({ width, margin }) => {
  const svgMarkup = `
<svg width="186" height="186" viewBox="0 0 186 186" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M93.2015 130.408C86.2393 130.408 79.4334 128.343 73.6446 124.475C67.8557 120.607 63.3439 115.108 60.6796 108.676C58.0153 102.243 57.3181 95.1648 58.6764 88.3359C60.0347 81.507 63.3872 75.2343 68.3103 70.311C73.2333 65.3876 79.5056 62.0348 86.334 60.6764C93.1624 59.3181 100.24 60.0153 106.673 62.6798C113.105 65.3443 118.602 69.8564 122.47 75.6456C126.338 81.4349 128.403 88.2412 128.403 95.2038C128.391 104.537 124.679 113.484 118.08 120.084C111.481 126.683 102.534 130.396 93.2015 130.408V130.408ZM93.2015 77.4009C89.6806 77.4009 86.2389 78.445 83.3114 80.4013C80.3839 82.3575 78.1022 85.1379 76.7548 88.391C75.4074 91.644 75.0549 95.2236 75.7418 98.677C76.4287 102.13 78.1241 105.303 80.6137 107.792C83.1033 110.282 86.2753 111.978 89.7285 112.665C93.1817 113.352 96.7611 112.999 100.014 111.652C103.267 110.304 106.047 108.022 108.003 105.095C109.959 102.167 111.003 98.7249 111.003 95.2038C110.996 90.4843 109.118 85.9602 105.782 82.623C102.445 79.2858 97.9207 77.4078 93.2015 77.4009V77.4009Z" fill="#231F20"/>
<path d="M96.6692 185.983H87.3358C77.9324 185.983 70.5652 177.085 70.5652 165.715V157.596C67.6953 156.639 64.8925 155.492 62.1756 154.161L56.3903 160.025C53.1401 163.397 48.9443 165.703 44.3564 166.641C41.855 167.171 39.2626 167.087 36.8004 166.398C34.3382 165.708 32.0794 164.434 30.2164 162.682L23.5746 156.136C16.8804 149.538 17.8854 138.019 25.8556 129.917L31.5185 124.175C30.0586 121.354 28.7999 118.433 27.7519 115.435L19.5371 115.077C14.8561 114.928 10.3306 113.362 6.5594 110.584C2.1898 107.237 -0.204732 102.448 0.0137477 97.4748L0.415716 88.1582C0.634196 83.1503 3.42201 78.5881 8.07126 75.6253C12.0695 73.186 16.7131 72.0159 21.3898 72.2693L27.079 72.5139C28.2249 68.8459 29.6869 65.2842 31.4486 61.8689L26.1177 56.625C17.9903 48.6806 16.7668 37.1878 23.3387 30.4581L29.8581 23.7897C36.4299 17.06 47.9482 18.0127 56.0756 25.9572L62.0533 31.8827C64.7987 30.5316 67.6306 29.3638 70.5303 28.3868V20.2675C70.5303 8.90584 77.8975 0 87.3008 0H96.6343C106.038 0 113.405 8.90584 113.405 20.2675V28.3868C116.38 29.3788 119.282 30.5761 122.092 31.9701L127.588 26.3505C130.829 22.9685 135.019 20.6493 139.605 19.6995C142.11 19.1374 144.715 19.1971 147.192 19.8735C149.669 20.5499 151.943 21.8224 153.815 23.5799L160.483 30.1085C167.203 36.6896 166.242 48.1999 158.289 56.3279L152.661 62.0699C154.055 64.7938 155.264 67.6086 156.279 70.4951H164.756C176.117 70.4951 185.022 77.8627 185.022 87.2754V96.6008C185.022 106.005 176.126 113.372 164.756 113.372H156.978C155.797 117.116 154.294 120.751 152.486 124.236L158.167 129.952C161.508 133.235 163.773 137.457 164.66 142.056C165.613 147.484 164.127 152.623 160.57 156.154L153.963 162.726C152.525 164.127 150.824 165.229 148.959 165.97C147.093 166.711 145.099 167.076 143.092 167.043C142.002 167.04 140.914 166.94 139.841 166.746C135.247 165.835 131.038 163.549 127.772 160.191L121.803 154.187C119.102 155.505 116.317 156.644 113.466 157.596V165.715C113.44 177.085 106.073 185.983 96.6692 185.983ZM88.568 168.582H95.437C95.8534 167.684 96.0597 166.704 96.04 165.715V160.934C93.3508 161.096 90.6543 161.096 87.965 160.934V165.715C87.9496 166.704 88.1556 167.683 88.568 168.582ZM136.581 144.39L140.077 147.886C140.761 148.598 141.597 149.144 142.524 149.485L147.392 144.643C147.055 143.717 146.511 142.88 145.801 142.196L142.305 138.7C140.51 140.707 138.599 142.607 136.581 144.39ZM36.7096 144.626L41.6035 149.45C42.5287 149.1 43.3624 148.544 44.0418 147.825L47.4414 144.381C45.4081 142.616 43.482 140.73 41.6735 138.735L38.2914 142.161C37.5885 142.856 37.0483 143.698 36.7096 144.626ZM92.0462 42.3705C82.0212 42.3705 72.2213 45.3434 63.8858 50.9134C55.5503 56.4833 49.0536 64.4002 45.2172 73.6627C41.3808 82.9252 40.377 93.1174 42.3328 102.95C44.2886 112.783 49.1161 121.816 56.2048 128.905C63.2936 135.994 72.3252 140.822 82.1576 142.778C91.99 144.734 102.181 143.73 111.443 139.893C120.705 136.057 128.622 129.559 134.191 121.223C139.761 112.887 142.734 103.087 142.734 93.0612C142.742 86.3956 141.435 79.7938 138.889 73.6338C136.342 67.4738 132.606 61.8765 127.894 57.1624C123.182 52.4483 117.586 48.7099 111.427 46.1612C105.269 43.6125 98.6677 42.3035 92.0025 42.3093L92.0462 42.3705ZM20.3324 97.7894L24.1514 97.9554C24.0378 96.3211 23.9766 94.678 23.9766 93.0437C23.9766 91.9891 24.0028 90.9316 24.0553 89.8711L20.6819 89.7226C19.6938 89.6638 18.7052 89.8281 17.7892 90.2033L17.4921 97.064C18.3721 97.5169 19.3431 97.7648 20.3324 97.7894ZM160.055 96.0414H164.774C165.763 96.0611 166.743 95.8548 167.64 95.4384V88.5689C166.742 88.1565 165.762 87.9505 164.774 87.9659H159.924C160.055 89.6614 160.116 91.3657 160.116 93.0524C160.072 93.9788 160.055 94.9752 160.011 95.9715L160.055 96.0414ZM136.878 41.8548C138.904 43.6317 140.824 45.5256 142.629 47.5269L145.871 44.2058C146.577 43.5124 147.116 42.6663 147.444 41.7324L142.541 36.9343C141.616 37.2849 140.782 37.8407 140.103 38.5599L136.878 41.8548ZM38.3438 44.2757L41.5686 47.4221C43.3717 45.4193 45.295 43.528 47.3278 41.7587L43.9894 38.4987C43.2932 37.7958 42.448 37.2582 41.5162 36.9256L36.7096 41.7849C37.0621 42.7091 37.6176 43.5424 38.3351 44.2233L38.3438 44.2757ZM92.0025 24.8909C93.3396 24.8909 94.6942 24.9346 96.04 25.0133V20.2326C96.0597 19.2436 95.8534 18.2632 95.437 17.366H88.568C88.1556 18.2645 87.9496 19.244 87.965 20.2326V25.0133C89.3108 24.9521 90.6654 24.8909 92.0025 24.8909Z" fill="#231F20"/>
</svg>
`
  const SvgImage = () => <SvgXml xml={svgMarkup} width={width} />

  return <SvgImage />
}