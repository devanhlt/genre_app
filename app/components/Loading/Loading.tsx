import * as React from "react"
import { ActivityIndicator, ImageStyle, StyleProp, View, ViewStyle } from "react-native"

interface LoadingProps {
  viewStyle?: StyleProp<ViewStyle>
  color?: string
  inline?: boolean
  size?: number | "small" | "large" | undefined
  animating?: boolean
}

const testID = "GenLink-Loading"

export function Loading(props: LoadingProps) {
  const { viewStyle: $viewStyleOverride, color = "blue", inline, animating = true, ...rest } = props

  /**
   *
   * If inline props is true return inline loading
   */
  if (inline) {
    return <ActivityIndicator color={color} animating={animating} testID={testID} {...rest} />
  }

  /**
   *
   * Loading full screen
   */
  return (
    <View style={[$viewStyle, $viewStyleOverride]} testID={testID}>
      <ActivityIndicator color={color} animating={animating} {...rest} />
    </View>
  )
}

const $viewStyle: ImageStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
