import React from 'react'
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native'
import { Colors } from '../constants/colors'

interface InputProps extends TextInputProps {
  label: string
  onUpdateValue: (value: string) => void
  value: string
  isInvalid?: boolean
}

const Input = ({ label, keyboardType, secureTextEntry, onUpdateValue, value }: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label]}>{label}</Text>
      <TextInput
        style={[styles.input]}
        autoCapitalize='none'
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },

  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
})
