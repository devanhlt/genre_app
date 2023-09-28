import React, { ComponentType, ReactNode } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

import { appColors, iconSizes, shape, spacing, typography } from "app/theme"
import { IconTypes, IconWeight, PhosphorIcon } from "../Icon/PhosphorIcon"
import { Typography, TypographyProps } from "../Typography"

const $baseViewStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  borderRadius: shape.medium,
  paddingVertical: spacing.size12,
  paddingHorizontal: spacing.size16,
}

const $iconStyle: ViewStyle = {
  zIndex: 1,
}

const $rightAccessoryStyle: ViewStyle = { marginStart: spacing.size04, zIndex: 1 }

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

const $iconPresets: Record<Presets, string> = {
  primary: appColors.common.characterWhite,
  secondary: appColors.common.characterRedDefault,
  tertiary: appColors.common.characterRedDefault,
}

const $pressedIconPresets: Record<Presets, string> = {
  primary: appColors.common.characterWhite,
  secondary: appColors.common.characterBluePress,
  tertiary: appColors.common.characterBluePress,
}

const $iconDisabledPresets: Record<Presets, string> = {
  primary: appColors.common.characterDisabled,
  secondary: appColors.common.characterDisabled,
  tertiary: appColors.common.characterDisabled,
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
  textStyle?: StyleProp<TextStyle>
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
export function Button(props: ButtonProps): JSX.Element {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    children,
    RightAccessory,
    disabled,
    icon,
    iconSize = iconSizes.small,
    iconWeight = "bold",
    loading,
    size = "medium",
    ...rest
  } = props

  f()
  function f() {
    return null
  }

  const preset: Presets = $viewPresets[props.preset] ? props.preset : "primary"

  function viewStyle({ pressed }): StyleProp<ViewStyle> {
    return [
      !!tx || !!text ? $viewPresets[preset][size] : $viewOnlyIconPresets[preset][size],
      $viewStyleOverride,
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
      !!disabled && [$pressedViewDisabledPresets[preset], $pressedViewStyleOverride],
    ]
  }

  function textStyle({ pressed }): StyleProp<TextStyle> {
    return [
      $textPresets[preset],
      $textStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
      !!disabled && [$textDisabledPresets[preset], $pressedTextStyleOverride],
    ]
  }

  function iconColor({ pressed }): string {
    if (disabled) {
      return $iconDisabledPresets[preset]
    }
    if (pressed) {
      return $pressedIconPresets[preset]
    }
    return $iconPresets[preset]
  }

  return (
    <Pressable style={viewStyle} {...rest}>
      {(state): ReactNode => (
        <>
          {!!icon && !loading ? (
            <View style={$iconStyle}>
              <PhosphorIcon
                weight={iconWeight}
                size={iconSize}
                name={icon}
                color={iconColor(state)}
              />
            </View>
          ) : null}

          {(!!tx || !!text) && (
            <Typography tx={tx} text={text} txOptions={txOptions} style={textStyle(state)}>
              {children}
            </Typography>
          )}

          {!!RightAccessory && (
            <RightAccessory style={$rightAccessoryStyle} pressableState={state} />
          )}
        </>
      )}
    </Pressable>
  )
}
