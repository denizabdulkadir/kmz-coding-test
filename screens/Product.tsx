import { FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'

import { ProductScreenProps } from '../types'
import { addProductToCart, getCart, getProducts, getSubcategories } from '../services/OtherServices'
import { AuthContext } from '../store/auth-context'
import { CategoryContext } from '../store/category-context'
import { Colors } from '../constants/colors'
import ProductItem from '../components/ProductItem'

const Product: React.FC<ProductScreenProps> = ({ route, navigation }) => {
  const [products, setProducts] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number>(-1)

  const { categoryId, name }: { categoryId: number; name: string } = route.params
  const categoryCtx = useContext(CategoryContext)

  useLayoutEffect(() => {
    navigation.setOptions({ title: name })
  }, [])

  useEffect(() => {
    async function fetchSubcategory() {
      const response = await getSubcategories(categoryId)
      const sCategories = response.data.categories
      setSubcategories(sCategories)
      setSelectedSubcategoryId(sCategories[0].id)
    }
    fetchSubcategory()
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      const response = await getProducts(selectedSubcategoryId, 1, 10)
      setProducts(response.data)
    }

    if (selectedSubcategoryId > 0) fetchProducts()
  }, [selectedSubcategoryId])

  const authCtx = useContext(AuthContext)

  async function handleAddCart(productId: number, amount: number) {
    try {
      const token: string = authCtx.token
      const response = await addProductToCart(productId, amount, token)
      console.log(response.data.message)
      const cartData = await getCart(token)
      navigation.navigate('Cart', { cart: cartData })
    } catch (error) {
      console.log(error)
    }
  }

  function renderCategoryItem(itemData) {
    return (
      <Pressable
        style={[
          styles.categoryInnerContainer,
          selectedSubcategoryId == itemData.item.id && styles.selectedCategoryContainer,
        ]}
        onPress={() => setSelectedSubcategoryId(itemData.item.id)}
        android_ripple={{ color: Colors.primary100 }}
      >
        <Image source={{ uri: itemData.item.imagePath.imagePath }} style={styles.categoryImage} />
        <Text>{itemData.item.categoryName}</Text>
      </Pressable>
    )
  }

  function renderProductItem(itemData) {
    return (
      <ProductItem
        onPress={() => {
          handleAddCart(itemData.item.id, 1)
        }}
        item={itemData.item}
      ></ProductItem>
    )
  }

  function ListFooterComponent() {
    return <View style={styles.footerComponent}></View>
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={subcategories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        style={styles.categoryContainer}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  categoryContainer: {
    width: '100%',
    height: 140,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.primary500,
    marginBottom: 12,
  },
  categoryInnerContainer: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 9,
    marginVertical: 12,
    marginHorizontal: 6,
    borderColor: Colors.primary500,
    borderWidth: 1,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.primary500,
  },
  categoryImage: { width: 50, height: 50, borderRadius: 12, marginBottom: 4 },

  footerComponent: { height: 30 },
})
