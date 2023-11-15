import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { getCart } from '../services/OtherServices'
import { AuthContext } from '../store/auth-context'
import { Colors } from '../constants/colors'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import { ProductScreenProps } from '../types'
import { DUMMY_CART } from '../data/dummy-cart'

const Cart: React.FC<ProductScreenProps> = ({ route }) => {
  const [cartData, setCartData] = useState()

  const authCtx = useContext(AuthContext)

  useLayoutEffect(() => {
    async function fetchCart() {
      const token: string = authCtx.token
      const cartData = await getCart(token)
      if (Object.keys(cartData.data).length === 0) {
        setCartData(DUMMY_CART)
      } else {
        setCartData(cartData)
      }
    }

    fetchCart()
  }, [])

  function renderCartItem(itemData) {
    return <CartItem onPress={() => {}} item={itemData.item}></CartItem>
  }

  return (
    <View style={styles.container}>
      <View style={styles.products}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartData?.data?.detail}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Toplam Tutar: {cartData?.data?.basket?.totalPrice}</Text>
        <Button onPress={() => {}}>Alışverişi Tamamla</Button>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary100 },
  products: { flex: 5 },
  footer: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  totalPrice: { fontSize: 22, fontWeight: '500', color: Colors.primary800, marginBottom: 20 },
})
