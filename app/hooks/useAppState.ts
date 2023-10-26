import { focusManager } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { AppState, AppStateStatus } from "react-native"

export function useAppState() {
  const [currentState, setCurrentState] = React.useState(AppState.currentState)

  function onAppStateChange(status: AppStateStatus) {
    // React Query already supports in web browser refetch on window focus by default
    focusManager.setFocused(status === "active")
    setCurrentState(status)
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange)
    return () => {
      // If RN >= 0.65 - Use `subscription.remove()`
      subscription.remove()
      // If RN < 0.65 - Use ` AppState.removeEventListener`
      // AppState.removeEventListener("change", onAppStateChange)
    }
  }, [onAppStateChange])

  return currentState
}
