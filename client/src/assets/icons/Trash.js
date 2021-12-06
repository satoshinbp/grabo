import React from 'react'
import { SvgXml } from 'react-native-svg'

export default ({ width }) => {
  const svgMarkup = `
  <svg width="18" height="18" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4 4.34696C11.3994 3.89766 11.2206 3.46693 10.9029 3.14923C10.5852 2.83152 10.1545 2.65278 9.70521 2.65219H8.53604C8.58619 2.44073 8.58783 2.22067 8.54083 2.00849C8.49384 1.79631 8.39943 1.59752 8.26468 1.42701C8.12993 1.25651 7.95833 1.11872 7.76275 1.02396C7.56717 0.929209 7.35268 0.879952 7.13536 0.879883H4.58767C4.37035 0.879952 4.15586 0.929209 3.96028 1.02396C3.7647 1.11872 3.59311 1.25651 3.45835 1.42701C3.3236 1.59752 3.22919 1.79631 3.1822 2.00849C3.1352 2.22067 3.13684 2.44073 3.18699 2.65219H2.29475C1.84545 2.65278 1.41471 2.83152 1.09701 3.14923C0.779307 3.46693 0.600562 3.89766 0.599976 4.34696V5.8645H1.92921V10.7937C1.92921 11.3519 2.15094 11.8872 2.54563 12.2819C2.94033 12.6766 3.47564 12.8983 4.03382 12.8983H7.96613C8.52431 12.8983 9.05963 12.6766 9.45432 12.2819C9.84901 11.8872 10.0707 11.3519 10.0707 10.7937V5.8645H11.4V4.34696ZM4.25536 2.31988C4.25536 2.23175 4.29037 2.14723 4.35269 2.08491C4.41501 2.02259 4.49953 1.98758 4.58767 1.98758H7.13536C7.22349 1.98758 7.30802 2.02259 7.37034 2.08491C7.43266 2.14723 7.46767 2.23175 7.46767 2.31988C7.46767 2.40802 7.43266 2.49254 7.37034 2.55486C7.30802 2.61718 7.22349 2.65219 7.13536 2.65219H4.58767C4.49963 2.65219 4.41519 2.61726 4.35289 2.55506C4.29058 2.49286 4.25551 2.40847 4.25536 2.32044V2.31988ZM8.96305 10.7937C8.96305 11.0581 8.85802 11.3117 8.67106 11.4987C8.4841 11.6856 8.23053 11.7907 7.96613 11.7907H4.03382C3.76942 11.7907 3.51585 11.6856 3.32889 11.4987C3.14193 11.3117 3.0369 11.0581 3.0369 10.7937V5.8645H8.96305V10.7937ZM10.2923 4.75681H1.70767V4.34696C1.70796 4.19135 1.76991 4.04219 1.87994 3.93216C1.98998 3.82212 2.13913 3.76018 2.29475 3.75988H9.70521C9.86087 3.76003 10.0101 3.82193 10.1202 3.932C10.2302 4.04206 10.2921 4.1913 10.2923 4.34696V4.75681Z" fill="#282625"/>
<path d="M4.28932 10.9814C4.43621 10.9814 4.57708 10.9231 4.68095 10.8192C4.78482 10.7154 4.84317 10.5745 4.84317 10.4276V6.93837C4.84317 6.79148 4.78482 6.65061 4.68095 6.54674C4.57708 6.44287 4.43621 6.38452 4.28932 6.38452C4.14243 6.38452 4.00156 6.44287 3.89769 6.54674C3.79383 6.65061 3.73547 6.79148 3.73547 6.93837V10.4276C3.73547 10.5745 3.79383 10.7154 3.89769 10.8192C4.00156 10.9231 4.14243 10.9814 4.28932 10.9814Z" fill="#282625"/>
<path d="M6.0276 10.9578C6.17449 10.9578 6.31537 10.8994 6.41923 10.7955C6.5231 10.6917 6.58145 10.5508 6.58145 10.4039V6.91469C6.58145 6.7678 6.5231 6.62693 6.41923 6.52306C6.31537 6.41919 6.17449 6.36084 6.0276 6.36084C5.88071 6.36084 5.73984 6.41919 5.63597 6.52306C5.53211 6.62693 5.47375 6.7678 5.47375 6.91469V10.4039C5.47375 10.5508 5.53211 10.6917 5.63597 10.7955C5.73984 10.8994 5.88071 10.9578 6.0276 10.9578Z" fill="#282625"/>
<path d="M7.77321 10.9814C7.9201 10.9814 8.06097 10.9231 8.16484 10.8192C8.2687 10.7154 8.32705 10.5745 8.32705 10.4276V6.93837C8.32705 6.79148 8.2687 6.65061 8.16484 6.54674C8.06097 6.44287 7.9201 6.38452 7.77321 6.38452C7.62632 6.38452 7.48545 6.44287 7.38158 6.54674C7.27771 6.65061 7.21936 6.79148 7.21936 6.93837V10.4276C7.21936 10.5745 7.27771 10.7154 7.38158 10.8192C7.48545 10.9231 7.62632 10.9814 7.77321 10.9814Z" fill="#282625"/>
</svg>


`
  const SvgImage = () => <SvgXml xml={svgMarkup} width={width} />

  return <SvgImage />
}