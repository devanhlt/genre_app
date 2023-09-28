import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"

import { ToggleInputProps } from "./type"
import { appColors, spacing } from "app/theme"

export function Radio(props: ToggleInputProps) {
  const {
    on,
    status,
    disabled,
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
    pressed,
    size = 24,
  } = props

  const offBackgroundColor = [
    disabled && appColors.palette.neutral0,
    status === "error" && appColors.common.errorDefault,
    appColors.palette.neutral0,
  ].filter(Boolean)[0]

  const outerBorderColor = [
    disabled && appColors.common.borderDisabled,
    status === "error" && appColors.common.errorDefault,
    pressed && !on ? appColors.common.borderPress : appColors.common.borderFocus,
    !on && appColors.common.borderFocus,
    appColors.common.borderFocus,
  ].filter(Boolean)[0]

  const onBackgroundColor = [
    disabled && appColors.common.borderDisabled,
    status === "error" && appColors.common.errorDefault,
    pressed && on ? appColors.common.interactivePress : appColors.common.interactiveDefault,
    appColors.common.characterRedDefault,
  ].filter(Boolean)[0]

  const dotBackgroundColor = [
    disabled && appColors.palette.neutral0,
    status === "error" && appColors.common.errorDefault,
    appColors.palette.neutral0,
  ].filter(Boolean)[0]

  const $viewStyles: StyleProp<ViewStyle> = [
    $inputOuterBase,
    {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: offBackgroundColor,
      borderColor: outerBorderColor,
      borderWidth: !on ? spacing.size02 : 0,
    },
    $outerStyleOverride,
  ]

  return (
    <View style={$viewStyles}>
      <Animated.View
        style={[
          $radioInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
        ]}
      >
        <View
          style={[
            {
              backgroundColor: dotBackgroundColor,
              width: size / 4,
              height: size / 4,
              borderRadius: size / 4 / 2,
            },
            $detailStyleOverride,
          ]}
        />
      </Animated.View>
    </View>
  )
}

const $inputOuterBase: ViewStyle = {
  borderWidth: 0,
  alignItems: "center",
  overflow: "hidden",
  flexGrow: 0,
  flexShrink: 0,
  justifyContent: "space-between",
  flexDirection: "row",
}

const $radioInner: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}
