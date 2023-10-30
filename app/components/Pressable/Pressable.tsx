import React, { ComponentType, ReactNode } from "react"
import {
  PressableProps,
  PressableStateCallbackType,
  Pressable as RNPressable,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

import { appColors, spacing, typography } from "app/theme"
import { IconTypes, IconWeight } from "../Icon/PhosphorIcon"
import { TypographyProps } from "../Typography"

const $baseViewStyle: ViewStyle = {
  paddingVertical: spacing.size12,
  paddingHorizontal: spacing.size16,
}

const $viewPresets = {
  primary: {
    medium: [
      $baseViewStyle,
      { backgroundColor: appColors.components.button.primary },
    ] as StyleProp<ViewStyle>,
    small: [
      $baseViewStyle,
      {
        backgroundColor: appColors.components.button.primary,
        paddingVertical: spacing.size08,
        paddingHorizontal: spacing.size16,
      },
    ] as StyleProp<ViewStyle>,
  },
  secondary: {
    medium: [
      $baseViewStyle,
      {
        backgroundColor: appColors.components.button.secondary,
        borderWidth: 1,
        borderColor: appColors.common.borderDefault,
      },
    ] as StyleProp<ViewStyle>,
    small: [
      $baseViewStyle,
      {
        backgroundColor: appColors.components.button.secondary,
        borderWidth: 1,
        borderColor: appColors.common.borderDefault,
        paddingVertical: spacing.size08,
        paddingHorizontal: spacing.size12,
      },
    ] as StyleProp<ViewStyle>,
  },
  tertiary: {
    medium: [
      $baseViewStyle,
      { backgroundColor: appColors.palette.transparent },
    ] as StyleProp<ViewStyle>,
    small: [
      $baseViewStyle,
      {
        backgroundColor: appColors.palette.transparent,
        paddingVertical: spacing.size08,
        paddingHorizontal: spacing.size12,
      },
    ] as StyleProp<ViewStyle>,
  },
}

type Presets = keyof typeof $viewPresets

const $viewOnlyIconPresets = {
  primary: {
    medium: [
      $baseViewStyle,
      {
        backgroundColor: appColors.components.button.primary,
        paddingVertical: spacing.size12,
        paddingHorizontal: spacing.size12,
      },
    ] as StyleProp<ViewStyle>,
    small: [
      $baseViewStyle,
      {
        backgroundColor: appColors.components.button.primary,
        paddingVertical: spacing.size08,
        paddingHorizontal: spacing.size08,
      },
    ] as StyleProp<ViewStyle>,
  },
  secondary: {
    medium: [
      $baseViewStyle,
      {
        backgroundColor: appColors.components.button.secondary,
        borderWidth: 1,
        borderColor: appColors.common.borderDefault,
        paddingVertical: spacing.size12,
        paddingHorizontal: spacing.size12,
      },
    ] as StyleProp<ViewStyle>,
    small: [
      $baseViewStyle,
      {
        backgroundColor: appColors.components.button.secondary,
        borderWidth: 1,
        borderColor: appColors.common.borderDefault,
        paddingVertical: spacing.size08,
        paddingHorizontal: spacing.size08,
      },
    ] as StyleProp<ViewStyle>,
  },
  tertiary: {
    medium: [
      $baseViewStyle,
      {
        backgroundColor: appColors.palette.transparent,
        paddingVertical: spacing.size12,
        paddingHorizontal: spacing.size12,
      },
    ] as StyleProp<ViewStyle>,
    small: [
      $baseViewStyle,
      {
        backgroundColor: appColors.palette.transparent,
        paddingVertical: spacing.size08,
        paddingHorizontal: spacing.size08,
      },
    ] as StyleProp<ViewStyle>,
  },
}

const $baseTextStyle: TextStyle = {
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
  marginStart: spacing.size04,
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  primary: [$baseTextStyle, typography.label01, { color: appColors.common.characterWhite }],
  secondary: [$baseTextStyle, typography.label01, { color: appColors.common.characterRedDefault }],
  tertiary: [$baseTextStyle, typography.label01, { color: appColors.common.characterRedDefault }],
}

const $textDisabledPresets: Record<Presets, StyleProp<TextStyle>> = {
  primary: [$baseTextStyle, { color: appColors.common.characterDisabled }],
  secondary: [$baseTextStyle, { color: appColors.common.characterDisabled }],
  tertiary: [$baseTextStyle, { color: appColors.common.characterDisabled }],
}

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  primary: { backgroundColor: appColors.components.button.primaryPress },
  secondary: {
    backgroundColor: appColors.components.button.secondary,
    borderColor: appColors.common.borderPress,
  },
  tertiary: { backgroundColor: appColors.palette.transparent },
}

const $pressedViewDisabledPresets: Record<Presets, StyleProp<ViewStyle>> = {
  primary: { backgroundColor: appColors.components.button.disabled },
  secondary: {
    backgroundColor: appColors.components.button.secondary,
    borderColor: appColors.common.borderDisabled,
  },
  tertiary: { backgroundColor: appColors.palette.transparent },
}

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  primary: { opacity: 1 },
  secondary: { color: appColors.common.characterBluePress },
  tertiary: { color: appColors.common.characterBluePress },
}

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
  disabled?: boolean
  color?: string
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TypographyProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TypographyProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TypographyProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  viewStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * One of the different types of button presets.
   */
  size?: "small" | "medium"
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Icon to display for the `Button`.
   */
  icon?: IconTypes
  /**
   * Size of Icon to display for the `Button`.
   */
  iconSize?: number

  /**
   * Size of Icon to display for the `Button`.
   */
  iconWeight?: IconWeight
  /**
   * An optional style override for the button text.
   */
  iconStyle?: StyleProp<TextStyle>
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean

  /**
   * Whether to show a full width.
   */
  fullWidth?: boolean
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 */
export function Pressable(props: ButtonProps): JSX.Element {
  const {
    tx,
    text,
    style: $pressableStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    viewStyle: $viewStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    children,
    disabled,
    size = "medium",
    ...rest
  } = props

  f()
  function f() {
    return null
  }

  const preset: Presets = $viewPresets[props.preset] ? props.preset : "primary"

  function pressableStyle({ pressed }): StyleProp<ViewStyle> {
    return [
      !!tx || !!text ? $viewPresets[preset][size] : $viewOnlyIconPresets[preset][size],
      $pressableStyleOverride,
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
      !!disabled && [$pressedViewDisabledPresets[preset], $pressedViewStyleOverride],
    ]
  }

  function viewStyle({ pressed }): StyleProp<ViewStyle> {
    return [
      $textPresets[preset],
      $viewStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
      !!disabled && [$textDisabledPresets[preset], $pressedTextStyleOverride],
    ]
  }

  return (
    <RNPressable style={pressableStyle} {...rest}>
      {(state): ReactNode => (
        <>
          <View style={viewStyle(state)}>{children}</View>
        </>
      )}
    </RNPressable>
  )
}
