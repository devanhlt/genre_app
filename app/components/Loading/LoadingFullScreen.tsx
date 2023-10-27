import { appColors } from "app/theme"
import { deviceHeight, deviceWidth } from "app/utils/screens"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { AnimatedLoading } from "./AnimatedLoading"

interface LoadingFullScreenProps {
  viewStyle?: StyleProp<ViewStyle>
}

const testID = "GenAPIManagement-LoadingFullScreen"

export const LoadingFullScreen = (props: LoadingFullScreenProps) => {
  const { viewStyle: $viewStyleOverride } = props

  return (
    <View style={[$containerStyle, $viewStyleOverride]} testID={testID} pointerEvents="box-none">
      <View style={$overlayStyle}>
        <AnimatedLoading />
      </View>
    </View>
  )
}

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
