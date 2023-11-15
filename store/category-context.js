import AsyncStorage from '@react-native-async-storage/async-storage'

import { createContext, useEffect, useState } from 'react'

export const CategoryContext = createContext({
  categories: [],
  subcategories: [],
  updateCategories: (categories) => {},
  updateSubcategories: (categories) => {},
})

function CategoryContextProvider({ children }) {
  const [allCategories, setAllCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])

  function updateCategories(categories) {
    setAllCategories([...categories])
  }
  function updateSubCategories(suncategories) {
    setAllCategories([...subcategoriescategories])
  }

  const value = {
    categories: allCategories,
    subcategories: subcategories,
    updateCategories: updateCategories,
    updateSubCategories: updateSubCategories,
  }

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
}

export default CategoryContextProvider
