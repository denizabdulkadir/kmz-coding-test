import axios from 'axios'

const GUID = '24BE-DB0E-D75E-4060'
const userId = 13

const API_URL_CATEGORIES = 'https://apiv5.akilliticaretim.com/api/v5/ad/product/categories'
const API_URL_SUBCATEGORY = 'https://apiv5.akilliticaretim.com/api/v5/ad/product/categories'
const API_URL_PRODUCT = 'https://apiv5.akilliticaretim.com/api/v5/sf/product/category_products'

const API_URL_ADD_CART = 'https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart'
const API_URL_FETCH_CART = 'https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart-v2'

export async function getCategories() {
  try {
    const response = await axios.get(API_URL_CATEGORIES, {
      headers: {
        GUID: GUID,
      },
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function getSubcategories(parentId: number) {
  try {
    const response = await axios.get(`${API_URL_SUBCATEGORY}?parentId=${parentId}`, {
      headers: {
        GUID: GUID,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function getProducts(categoryId: number, pageNumber: number, pageSize: number) {
  try {
    const response = await axios.get(
      `${API_URL_PRODUCT}?Id=${categoryId}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
      {
        headers: {
          GUID: GUID,
        },
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function addProductToCart(productId: number, amount: number, token: string) {
  try {
    const response = await axios.post(
      API_URL_ADD_CART,
      {
        productId,
        amount,
        userId,
      },
      {
        headers: {
          GUID: GUID,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.log('error:', error)
  }
}

export async function getCart(token: string) {
  try {
    const response = await axios.get(`${API_URL_FETCH_CART}?userId=${userId}`, {
      headers: {
        GUID: GUID,
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}
