import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { AuthContext } from '../store/auth-context'
import Button from '../components/Button'

const Profile: React.FC = () => {
  const authCtx = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.authContent}>
        <View style={styles.buttons}>
          <Button onPress={() => authCtx.logout()}> Log out</Button>
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
  },
})
