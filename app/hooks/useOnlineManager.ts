import NetInfo from "@react-native-community/netinfo"
import { onlineManager } from "@tanstack/react-query"

export function useOnlineManager() {
  return onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(
        state.isConnected != null && state.isConnected && Boolean(state.isInternetReachable),
      )
    })
  })
}
