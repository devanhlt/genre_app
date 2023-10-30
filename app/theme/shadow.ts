import { appColors } from "./colors"
import { Animated, StyleProp, ViewStyle } from "react-native"

const SHADOW_COLOR = appColors.palette.neutral900
const SHADOW_OPACITY = 0.15

export function pvcShadow(elevation: number | Animated.Value = 0) {
  const inputRange = [0, 1, 2, 3, 4, 5]
  const shadowHeight = [0, 1, 2, 4, 6, 8]
  const shadowRadius = [0, 3, 6, 8, 10, 12]

  if (elevation instanceof Animated.Value) {
    return {
      shadowColor: SHADOW_COLOR,
      shadowOffset: {
        width: new Animated.Value(0),
        height: elevation.interpolate({
          inputRange,
          outputRange: shadowHeight,
        }),
      },
      shadowOpacity: elevation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, SHADOW_OPACITY],
        extrapolate: "clamp",
      }),
      shadowRadius: elevation.interpolate({
        inputRange,
        outputRange: shadowRadius,
      }),
    }
  } else {
    return {
      shadowColor: SHADOW_COLOR,
      shadowOpacity: elevation ? SHADOW_OPACITY : 0,
      shadowOffset: {
        width: 0,
        height: shadowHeight[elevation],
      },
      shadowRadius: shadowRadius[elevation],
    }
  }
}

export const shadow = {
  low: pvcShadow(1) as StyleProp<ViewStyle>,
  medium: pvcShadow() as StyleProp<ViewStyle>,
  high: pvcShadow(5) as StyleProp<ViewStyle>,
} as const

export type Shadow = keyof typeof shadow
