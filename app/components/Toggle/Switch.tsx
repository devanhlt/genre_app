import React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { SwitchToggleProps, ToggleInputProps, Variants } from "./type"
import { iconRegistry } from "../Icon"
import { appColors, spacing } from "app/theme"
import { SvgIcon } from "../SvgIcon"

export function Switch(props: ToggleInputProps) {
  const {
    on,
    status,
    disabled,
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
    checkboxIcon = "Check",
  } = props

  const knobSizeFallback = 2

  const knobWidth = [$detailStyleOverride?.width, $switchDetail?.width, knobSizeFallback].find(
    (v) => typeof v === "number",
  )

  const knobHeight = [$detailStyleOverride?.height, $switchDetail?.height, knobSizeFallback].find(
    (v) => typeof v === "number",
  )

  const offBackgroundColor = [
    disabled && appColors.palette.neutral200,
    status === "error" && appColors.common.errorDefault,
    appColors.palette.neutral0,
  ].filter(Boolean)[0]

  const onBackgroundColor = [
    disabled && appColors.palette.transparent,
    status === "error" && appColors.common.errorDefault,
    appColors.common.characterRedDefault,
  ].filter(Boolean)[0]

  const knobBackgroundColor = (function () {
    if (on) {
      return [
        $detailStyleOverride?.backgroundColor,
        status === "error" && appColors.common.errorDefault,
        disabled && appColors.palette.neutral400,
        appColors.palette.neutral0,
      ].filter(Boolean)[0]
    } else {
      return [
        $innerStyleOverride?.backgroundColor,
        disabled && appColors.palette.neutral400,
        status === "error" && appColors.palette.neutral600,
        appColors.common.characterRedDefault,
      ].filter(Boolean)[0]
    }
  })()

  const switchContainer = (function () {
    if (on) {
      return [
        $inputOuterVariants.switch,

        {
          backgroundColor: offBackgroundColor,
          borderWidth: 1,
          borderColor: disabled
            ? appColors.palette.neutral200
            : appColors.common.characterRedDefault,
        },

        $outerStyleOverride,
      ]
    } else {
      return [
        $inputOuterVariants.switch,
        {
          backgroundColor: offBackgroundColor,
          borderWidth: 1,
          borderColor: disabled ? appColors.palette.neutral200 : appColors.common.characterDisabled,
        },
        $outerStyleOverride,
      ]
    }
  })()

  const $animatedSwitchKnob = useAnimatedStyle(() => {
    const offsetLeft = ($innerStyleOverride?.paddingStart ||
      $innerStyleOverride?.paddingLeft ||
      $switchInner?.paddingStart ||
      $switchInner?.paddingLeft ||
      0) as number

    const offsetRight = ($innerStyleOverride?.paddingEnd ||
      $innerStyleOverride?.paddingRight ||
      $switchInner?.paddingEnd ||
      $switchInner?.paddingRight ||
      0) as number

    const start = withTiming(on ? "100%" : "0%")
    const marginStart = withTiming(on ? -(knobWidth || 0) - offsetRight : 0 + offsetLeft)

    return { start, marginStart }
  }, [on, knobWidth])

  const iconTintColor = [
    disabled && (on ? appColors.palette.neutral0 : disabled && appColors.palette.neutral400),
    status === "error" && appColors.common.errorDefault,
    appColors.common.characterRedDefault,
  ].filter(Boolean)[0]

  return (
    <View style={switchContainer}>
      <Animated.View
        style={[
          $switchInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
        ]}
      />

      <SwitchAccessibilityLabel {...props} role="on" />
      <SwitchAccessibilityLabel {...props} role="off" />

      <Animated.View
        style={[
          $switchDetail,
          $detailStyleOverride,
          $animatedSwitchKnob,
          { width: knobWidth, height: knobHeight },
          { backgroundColor: knobBackgroundColor },
        ]}
      >
        {/* <Image
          source={iconRegistry.check}
          style={[$switchIcon, { tintColor: iconTintColor }, $detailStyleOverride]}
        /> */}
        <SvgIcon
          name={checkboxIcon}
          width={(knobWidth as number) - spacing.size08}
          height={(knobHeight as number) - 6}
          fill={iconTintColor}
          style={[$switchIcon, $detailStyleOverride]}
        />
      </Animated.View>
    </View>
  )
}

function SwitchAccessibilityLabel(props: ToggleInputProps & { role: "on" | "off" }) {
  const { on, disabled, status, switchAccessibilityMode, role, innerStyle, detailStyle } = props

  if (!switchAccessibilityMode) return null

  const shouldLabelBeVisible = (on && role === "on") || (!on && role === "off")

  const $switchAccessibilityStyle = [
    $switchAccessibility,
    role === "off" && { end: "5%" },
    role === "on" && { left: "5%" },
  ]

  const color = (function () {
    if (disabled) return appColors.palette.neutral600
    if (status === "error") return appColors.palette.neutral600
    if (!on) return innerStyle?.backgroundColor || appColors.palette.neutral600
    return detailStyle?.backgroundColor || appColors.palette.neutral600
  })()

  return (
    <View style={$switchAccessibilityStyle}>
      {switchAccessibilityMode === "text" && shouldLabelBeVisible && (
        <View
          style={[
            role === "on" && $switchAccessibilityLine,
            role === "on" && { backgroundColor: color },
            role === "off" && $switchAccessibilityCircle,
            role === "off" && { borderColor: color },
          ]}
        />
      )}

      {switchAccessibilityMode === "icon" && shouldLabelBeVisible && (
        <Image
          style={[$switchAccessibilityIcon, { tintColor: color }]}
          source={role === "off" ? iconRegistry.hidden : iconRegistry.view}
        />
      )}
    </View>
  )
}

const $inputOuterBase: ViewStyle = {
  height: 24,
  width: 24,
  borderWidth: 2,
  alignItems: "center",
  overflow: "hidden",
  flexGrow: 0,
  flexShrink: 0,
  justifyContent: "space-between",
  flexDirection: "row",
}

const $inputOuterVariants: Record<Variants, StyleProp<ViewStyle>> = {
  checkbox: [$inputOuterBase, { borderRadius: 4 }],
  radio: [$inputOuterBase, { borderRadius: 12 }],
  switch: [
    $inputOuterBase,
    {
      height: 24,
      width: 48,
      borderRadius: 24,
    },
  ],
}

const $switchIcon: ImageStyle = {
  marginStart: 2,
  marginTop: 2,
}

const $switchInner: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  borderColor: appColors.palette.neutral0,
  overflow: "hidden",
  position: "absolute",
  paddingStart: 2,
  paddingEnd: 2,
}

const $switchDetail: SwitchToggleProps["inputDetailStyle"] = {
  borderRadius: 20,
  position: "absolute",
  width: 20,
  height: 20,
  justifyContent: "center",
  alignItems: "center",
}

const $switchAccessibility: TextStyle = {
  width: "40%",
  justifyContent: "center",
  alignItems: "center",
}

const $switchAccessibilityIcon: ImageStyle = {
  width: 14,
  height: 14,
  resizeMode: "contain",
}

const $switchAccessibilityLine: ViewStyle = {
  width: 2,
  height: 12,
}

const $switchAccessibilityCircle: ViewStyle = {
  borderWidth: 2,
  width: 12,
  height: 12,
  borderRadius: 6,
}
