import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'
import IconButton from './IconButton'

function ProductItem(props: any) {
  return (
    <View style={[styles.productItem]}>
      <Image
        source={{
          uri: props.item.productImages[0].imagePath,
        }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text>{props.item.stockName}</Text>
        <Text style={styles.priceText}>{props.item.priceVat} tl</Text>
      </View>
      <View style={styles.iconButton}>
        <IconButton icon='cart' size={25} color={Colors.primary800} onPress={props.onPress} />
      </View>
    </View>
  )
}

export default ProductItem

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
  productImage: { width: 70, height: 70, borderRadius: 16, marginRight: 12 },
  productInfo: { alignItems: 'center', width: '60%' },
  priceText: { fontSize: 16, fontWeight: '700', color: Colors.primary800, marginVertical: 8 },
  iconButton: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
