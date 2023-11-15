import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'
import IconButton from './IconButton'

function CartItem(props: any) {
  return (
    <View style={[styles.productItem]}>
      <Image
        source={{
          uri: props.item.productImage,
        }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text>{props.item.stockName}</Text>
        <Text style={{ marginVertical: 8 }}>
          {props.item.qty} X {props.item.salePrice}
        </Text>
      </View>
      <View style={styles.productPrice}>
        <IconButton icon='trash' size={22} color={Colors.primary800} onPress={() => {}} />
        <Text style={styles.priceText}>
          {props.item.qty * props.item.salePrice}
          {' tl '}
        </Text>
      </View>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 4,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: Colors.primary500,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  productImage: { width: 70, height: 70, marginRight: 12 },
  productInfo: { alignItems: 'center', width: '60%' },
  productPrice: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  priceText: { fontSize: 16, fontWeight: '700', color: Colors.primary500 },
})
