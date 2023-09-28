import { TxKeyPath, isRTL, translate } from "app/i18n"
import { appColors, typography } from "app/theme"
import i18n from "i18n-js"
import React from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"

type Weights = keyof typeof typography.body02
type Presets = keyof typeof typography

export interface TypographyProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights

  /**
   * Color modifier.
   */
  color?: string
  /**
   * Children components.
   */
  children?: React.ReactNode
}

export function Typography(props: TypographyProps) {
  const {
    tx,
    txOptions,
    text,
    children,
    style: $styleOverride,
    color = appColors.common.characterPrimary,
    ...rest
  } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const preset: Presets = typography[props.preset] ? props.preset : "body02"

  const $styles = [$rtlStyle, { color }, typography[preset], $styleOverride]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
