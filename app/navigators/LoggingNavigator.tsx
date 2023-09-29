/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import * as Screens from "app/screens"
import { appColors } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"

export type LoggingStackParamList = {
  LoggingScreen?: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */

export type LoggingStackScreenProps<T extends keyof LoggingStackParamList> = NativeStackScreenProps<
  LoggingStackParamList,
  T
>

const Stack = createNativeStackNavigator<LoggingStackParamList>()

export const LoggingStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: appColors.common.appBackground }}
      initialRouteName={"LoggingScreen"}
    >
      <Stack.Screen name="LoggingScreen" component={Screens.LoggingScreen} />
      {/* <Stack.Screen name="LoggingDetailScreen" component={Screens.LoggingDetailScreen} /> */}
    </Stack.Navigator>
  )
})
