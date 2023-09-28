import React from "react"
import { ImageStyle, View, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"

import { appColors, iconSizes, shape, spacing } from "app/theme"
import { SvgIcon } from "../SvgIcon"
import { ToggleInputProps } from "./type"

export function Checkbox(props: ToggleInputProps) {
  const {
    on,
    status,
    disabled,
    checkboxIcon = "Check",
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
    size = iconSizes.medium,
    pressed,
  } = props

  const offBackgroundColor = [
    disabled && appColors.palette.neutral0,
    status === "error" && appColors.common.errorHover,
    appColors.palette.neutral0,
  ].filter(Boolean)[0]

  const outerBorderColor = [
    disabled && appColors.common.characterDisabled,
    status === "error" && appColors.common.errorDefault,
    pressed && !on ? appColors.common.borderPress : appColors.common.borderFocus,
    !on && appColors.common.borderFocus,
    appColors.common.borderFocus,
  ].filter(Boolean)[0]

  const onBackgroundColor = [
    disabled && appColors.common.interactiveDisabled,
    status === "error" && appColors.common.errorDefault,
    pressed && on ? appColors.common.interactivePress : appColors.common.interactiveDefault,
    appColors.common.interactiveDefault,
  ].filter(Boolean)[0]

  const iconTintColor = [
    disabled && appColors.palette.neutral0,
    status === "error" && appColors.common.errorDefault,
    appColors.palette.neutral0,
  ].filter(Boolean)[0]

  const $viewStyles = [
    $inputOuterBase,
    {
      backgroundColor: offBackgroundColor,
      borderColor: outerBorderColor,
      width: size,
      height: size,
      borderWidth: !on ? spacing.size02 : 0,
    },

    $outerStyleOverride,
  ]

  return (
    <View style={$viewStyles}>
      <Animated.View
        style={[
          $checkboxInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
        ]}
      >
        <SvgIcon
          name={checkboxIcon}
          width={size / 2}
          height={size / 2.5}
          fill={iconTintColor}
          style={[$checkboxDetail, $detailStyleOverride]}
        />
      </Animated.View>
    </View>
  )
}

const $inputOuterBase: ViewStyle = {
  alignItems: "center",
  overflow: "hidden",
  flexGrow: 0,
  flexShrink: 0,
  justifyContent: "space-between",
  flexDirection: "row",
  borderRadius: shape.small,
  borderWidth: 0,
}

const $checkboxInner: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}

const $checkboxDetail: ImageStyle = {}
