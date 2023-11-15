// Login.tsx

import React, { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { login } from '../services/AuthService'
import { AuthContext } from '../store/auth-context'
import { Colors } from '../constants/colors'
import Input from '../components/Input'
import Button from '../components/Button'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const authCtx = useContext(AuthContext)

  const handleLogin = async () => {
    try {
      const loginData = await login(username, password)
      const token = loginData.data.token
      authCtx.authenticate(token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.authContent}>
        <Input
          value={username}
          label={'Username'}
          onUpdateValue={setUsername}
          // keyboardType={'email-address'}
        />
        <Input value={password} label={'Password'} onUpdateValue={setPassword} secureTextEntry />

        <View style={styles.buttons}>
          <Button onPress={handleLogin}> Login</Button>
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },

  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
})
