import 'react-native-gesture-handler'
import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

import Login from './screens/Login'
import AuthContextProvider, { AuthContext } from './store/auth-context'
import Home from './screens/Home'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CategoryContextProvider, { CategoryContext } from './store/category-context'
import Product from './screens/Product'
import { getCategories } from './services/OtherServices'
import Cart from './screens/Cart'
import { Colors } from './constants/colors'
import IconButton from './components/IconButton'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const [categories, setCategories] = useState([])
  const categoryCtx = useContext(CategoryContext)
  const authCtx = useContext(AuthContext)
  const navigation = useNavigation()

  useEffect(() => {
    async function getCat() {
      try {
        const response = await getCategories()
        setCategories(response.data.categories)
        categoryCtx.updateCategories(response.data.categories)
      } catch (error) {
        console.log(error)
      }
    }
    getCat()
  }, [])
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        drawerActiveTintColor: Colors.primary500,
        headerRight: ({ tintColor }) => (
          <View style={{ flexDirection: 'row', gap: 10, marginRight: 5 }}>
            <IconButton
              icon='cart'
              color={tintColor}
              size={24}
              onPress={() => {
                navigation.navigate('Cart')
              }}
            />
            <IconButton icon='exit' color={tintColor} size={24} onPress={authCtx.logout} />
          </View>
        ),
      }}
    >
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen
        name='Product'
        component={Product}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name='Cart'
        component={Cart}
        options={{ drawerItemStyle: { display: 'none' } }}
      />

      {categories.map((category, index) => (
        <Drawer.Screen
          key={index}
          name={category.categoryName}
          component={Product}
          initialParams={{ categoryId: category.id }}
        />
      ))}
    </Drawer.Navigator>
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext)

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true)
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token')
      if (storedToken) {
        authCtx.authenticate(storedToken)
      }
      setIsTryingLogin(false)
    }

    fetchToken()
  }, [])
  if (isTryingLogin) {
    return <ActivityIndicator />
  }
  return <Navigation />
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <AuthContextProvider>
        <CategoryContextProvider>
          <Root />
        </CategoryContextProvider>
      </AuthContextProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
