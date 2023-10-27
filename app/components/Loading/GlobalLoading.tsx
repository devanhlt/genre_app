import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { LoadingFullScreen } from "./LoadingFullScreen"

export const GlobalLoading = observer(function GlobalLoading() {
  const {
    commonStore: { isGlobalLoading },
  } = useStores()

  /**
   *
   * Global loading full screen
   */
  if (isGlobalLoading) return <LoadingFullScreen />

  return null
})
