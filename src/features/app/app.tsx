import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from 'states/store'

import { AppLoginScreen } from 'features/app/components/appLoginScreen/appLoginScreen'
import { HomeScreen } from 'features/homeScreen/homeScreen'
import 'modules/i18n/i18n'

const Stack = createNativeStackNavigator()
export const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Login"
                component={AppLoginScreen}
              />
              <Stack.Screen
                options={{ headerBackVisible: false }}
                name="Home"
                component={HomeScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  )
}

registerRootComponent(App)
