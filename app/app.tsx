/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("./devtools/ReactotronConfig.ts")
}
import { QueryClientProvider } from "@tanstack/react-query"
import { useFonts } from "expo-font"
import * as Linking from "expo-linking"
import React, { useState } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import "./i18n"
import "./utils/ignoreWarnings"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GlobalLoading } from "./components/Loading"
import { ToastMessage } from "./components/Toast"
import Config from "./config"
import { useOnlineManager } from "./hooks/useOnlineManager"
import { RootStore, RootStoreProvider, useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { SplashScreen } from "./screens"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import QueryClientSetup from "./services/react-query-client"
import { customFontsToLoad } from "./theme"
import { delay } from "./utils/delay"
import * as storage from "./utils/storage"
import { useAppState } from "./hooks/useAppState"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
    Demo: {
      screens: {
        DemoShowroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        DemoDebug: "debug",
        DemoPodcastList: "podcast",
        DemoCommunity: "community",
      },
    },
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const [isReady, setIsReady] = useState<boolean>(false)

  /**
   * The Online Manager manages the online state within TanStack Query.
   * It can be used to change the default event listeners or to manually change the online .
   */
  useOnlineManager()

  /**
   * AppState can tell you if the app is in the foreground or background, and notify you when the state changes.
   */
  useAppState()

  // Create a client
  const queryClient = QueryClientSetup.getInstance()

  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded] = useFonts(customFontsToLoad)

  const { rehydrated, rootStore } = useInitialRootStore(async (rootStore: RootStore) => {
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    await delay(1000)
    // Hide splash screen
    hideSplashScreen()
    // Get setting data before render main UI
    if (rootStore.authStore.isAuthenticated) {
      await rootStore.settingStore.fetchSettings()
    }
    setIsReady(true)
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded || !isReady) {
    return <SplashScreen />
  }

  // Configs linking
  const linking = {
    prefixes: [prefix],
    config,
  }

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <BottomSheetModalProvider>
            <ErrorBoundary catchErrors={Config.catchErrors}>
              <AppNavigator
                linking={linking}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </ErrorBoundary>
            <GlobalLoading />
            <ToastMessage />
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </RootStoreProvider>
  )
}

export default App
