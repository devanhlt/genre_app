import React, { FC, useMemo } from "react"
import { GestureResponderEvent, Pressable, TextStyle, View, ViewStyle } from "react-native"

import { appColors, spacing } from "app/theme"
import { Typography } from "../Typography"
import { Checkbox } from "./Checkbox"
import { Radio } from "./Radio"
import { Switch } from "./Switch"
import {
  BaseToggleProps,
  CheckboxToggleProps,
  SwitchToggleProps,
  ToggleInputProps,
  ToggleProps,
  Variants,
} from "./type"

export function Toggle(props: ToggleProps) {
  const {
    variant = "checkbox",
    editable = true,
    status,
    value,
    onPress,
    onValueChange,
    labelPosition = "right",
    helper,
    helperTx,
    helperTxOptions,
    HelperTextProps,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ...WrapperProps
  } = props

  const { switchAccessibilityMode } = props as SwitchToggleProps
  const { checkboxIcon } = props as CheckboxToggleProps

  const disabled = editable === false || status === "disabled" || props.disabled

  // const Wrapper = useMemo<ComponentType<TouchableOpacityProps>>(
  //   () => (disabled ? View : TouchableOpacity),
  //   [disabled],
  // )

  const ToggleInput = useMemo(() => ToggleInputs[variant] || (() => null), [variant])

  const $containerStyles = [$containerStyleOverride]
  const $inputWrapperStyles = [$inputWrapper, $inputWrapperStyleOverride]
  const $helperStyles = [
    $helper,
    status === "error" && { color: appColors.common.errorDefault },
    HelperTextProps?.style,
  ]

  function handlePress(e: GestureResponderEvent) {
    if (disabled) return
    onValueChange?.(!value)
    onPress?.(e)
  }

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole={variant}
      accessibilityState={{ checked: value, disabled }}
      {...WrapperProps}
      style={$containerStyles}
    >
      {(state) => {
        const pressed = !!state?.pressed
        return (
          <>
            <View style={$inputWrapperStyles}>
              {labelPosition === "left" && <FieldLabel {...props} labelPosition={labelPosition} />}

              <ToggleInput
                on={value}
                disabled={disabled}
                status={status}
                outerStyle={props.inputOuterStyle}
                innerStyle={props.inputInnerStyle}
                detailStyle={props.inputDetailStyle}
                switchAccessibilityMode={switchAccessibilityMode}
                checkboxIcon={checkboxIcon}
                size={props.size}
                pressed={pressed}
              />

              {labelPosition === "right" && <FieldLabel {...props} labelPosition={labelPosition} />}
            </View>

            {!!(helper || helperTx) && (
              <Typography
                preset="support01"
                text={helper}
                tx={helperTx}
                txOptions={helperTxOptions}
                {...HelperTextProps}
                style={$helperStyles}
              />
            )}
          </>
        )
      }}
    </Pressable>
  )
}

const ToggleInputs: Record<Variants, FC<ToggleInputProps>> = {
  checkbox: Checkbox,
  switch: Switch,
  radio: Radio,
}

function FieldLabel(props: BaseToggleProps) {
  const {
    status,
    label,
    labelTx,
    labelTxOptions,
    LabelTextProps,
    labelPosition,
    labelStyle: $labelStyleOverride,
  } = props

  if (!label && !labelTx && !LabelTextProps?.children) return null

  const $labelStyle = [
    $label,
    status === "error" && { color: appColors.common.errorDefault },
    (status === "disabled" || props.disabled) && { color: appColors.common.characterDisabled },
    labelPosition === "right" && $labelRight,
    labelPosition === "left" && $labelLeft,
    $labelStyleOverride,
    LabelTextProps?.style,
  ]

  return (
    <Typography
      preset="label03"
      text={label}
      tx={labelTx}
      txOptions={labelTxOptions}
      {...LabelTextProps}
      style={$labelStyle}
    />
  )
}

const $inputWrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $helper: TextStyle = {
  marginTop: spacing.size04,
}

const $label: TextStyle = {
  flex: 1,
}

const $labelRight: TextStyle = {
  marginStart: spacing.size16,
}

const $labelLeft: TextStyle = {
  marginEnd: spacing.size16,
}
