import { useStores } from "app/models"
import { appColors } from "app/theme"
import { deviceHeight, deviceWidth } from "app/utils/screens"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { AnimatedLoading } from "./AnimatedLoading"

interface GlobalLoadingProps {
  viewStyle?: StyleProp<ViewStyle>
  color?: string
  size?: number | "small" | "large" | undefined
  animating?: boolean
}

const testID = "GenAPIManagement-Global-Loading"

export const GlobalLoading = observer(function GlobalLoading(props: GlobalLoadingProps) {
  const { viewStyle: $viewStyleOverride } = props

  const {
    commonStore: { isGlobalLoading },
  } = useStores()

  /**
   *
   * Global loading full screen
   */
  if (isGlobalLoading) {
    return (
      <View style={[$containerStyle, $viewStyleOverride]} testID={testID} pointerEvents="box-none">
        <View style={$overlayStyle}>
          <AnimatedLoading />
        </View>
      </View>
    )
  }
  return null
})

const $containerStyle: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: appColors.palette.transparent,
  position: "absolute",
  left: 0,
  top: 0,
  width: deviceWidth,
  height: deviceHeight,
}

const $overlayStyle: ViewStyle = {
  backgroundColor: appColors.palette.overlay20,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 10,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}
