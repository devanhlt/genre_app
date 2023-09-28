import { useStores } from "app/models"
import { appColors } from "app/theme"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ActivityIndicator, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Typography } from "../Typography"
import { deviceHeight, deviceWidth } from "app/utils/screens"

interface GlobalLoadingProps {
  viewStyle?: StyleProp<ViewStyle>
  color?: string
  size?: number | "small" | "large" | undefined
  animating?: boolean
}

const testID = "GenAPIManagement-Global-Loading"

export const GlobalLoading = observer(function GlobalLoading(props: GlobalLoadingProps) {
  const { viewStyle: $viewStyleOverride, color = "blue", animating = true, ...rest } = props

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
          <Typography style={$textStyle} preset="body01" text="Vui lòng chờ..." />
          <ActivityIndicator color={color} animating={animating} {...rest} />
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
const $textStyle: TextStyle = {
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
