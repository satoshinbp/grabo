import axios from 'axios'
import { API_KEY } from '@env'
import products from '../mocks/products' // mock data to be removed once backend is ready

// export const fetchProducts = async (lang) => {
// const url = ``
// const res = await axios.get(url).catch((err) => {
//   throw err
// })
// return res.data
// }

export const fetchProducts = new Promise((resolve, reject) => {
  setTimeout((lang) => {
    resolve(products.filter((product) => product.lang === lang))
  }, 1000)
})
