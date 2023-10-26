import * as React from "react"
import { ActivityIndicator, ImageStyle, StyleProp, View, ViewStyle } from "react-native"
import LottieView from "lottie-react-native"
import * as Dot from "./animation.json"
import { appColors } from "app/theme"
import { responsiveHeight, responsiveWidth } from "app/utils/screens"

interface AnimatedLoadingProps {
  viewStyle?: StyleProp<ViewStyle>
  color?: string
  inline?: boolean
  size?: number | "small" | "large" | undefined
  animating?: boolean
}

const testID = "GenAPIManagement-Animated-Loading"

export function AnimatedLoading(props: AnimatedLoadingProps) {
  const {
    viewStyle: $viewStyleOverride,
    color = appColors.palette.red300,
    inline,
    animating = true,
    size = "large",
    ...rest
  } = props

  /**
   *
   * If inline props is true return inline loading
   */
  if (inline) {
    return (
      <ActivityIndicator
        color={color}
        animating={animating}
        size={size}
        testID={testID}
        {...rest}
      />
    )
  }

  /**
   *
   * Loading full screen
   */
  return (
    <View style={[$viewStyle, $viewStyleOverride]} testID={testID}>
      <LottieView loop autoPlay source={Dot} style={$dotStyles} />
    </View>
  )
}

const $viewStyle: ImageStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $dotStyles: ImageStyle = {
  width: responsiveWidth(200),
  height: responsiveHeight(200),
}
