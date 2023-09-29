import React, { useMemo } from "react"

import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated"

export const ModalBackdrop = ({ style }: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(1, [0, 1], [0, 1], Extrapolate.CLAMP),
  }))

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(0,0,0,0.3)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  )

  return <Animated.View style={containerStyle} />
}
