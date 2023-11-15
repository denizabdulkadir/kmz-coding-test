import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Button, FlatList, ScrollView } from 'react-native'

import { CategoryContext } from '../store/category-context'
import { HomeScreenProps } from '../types'
import { AuthContext } from '../store/auth-context'
import { CategoryColors, Colors } from '../constants/colors'
import CategoryGridTile from '../components/CategoryGridTile'

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [categories, setCategories] = useState([])

  const categoryCtx = useContext(CategoryContext)
  const authCtx = useContext(AuthContext)
  useEffect(() => {
    setCategories(categoryCtx.categories)
  }, [categoryCtx.categories])

  function renderCategoryItem(itemData) {
    return (
      <CategoryGridTile
        title={itemData.item.categoryName}
        color={CategoryColors[itemData.index % 10]}
        onPress={() =>
          navigation.navigate('Product', {
            categoryId: itemData.item.id,
            name: itemData.item.categoryName,
          })
        }
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary100 },
})
