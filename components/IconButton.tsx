import React from 'react'
import { Pressable, StyleSheet, PressableProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface IconButtonProps extends PressableProps {
  icon: string
  color: string
  size: number
  onPress: () => void
}

const IconButton: React.FC<IconButtonProps> = ({ icon, color, size, onPress }: IconButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
})
