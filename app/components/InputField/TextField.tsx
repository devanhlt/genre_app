import { isRTL, translate } from "app/i18n"
import { appColors, iconSizes, shape, spacing, typography } from "app/theme"
import React, {
  ComponentType,
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

import { Typography, TypographyProps } from "../Typography"
import { PhosphorIcon } from "../Icon/PhosphorIcon"

export interface TextFieldAccessoryProps {
  style: StyleProp<any>
  status: TextFieldProps["status"]
  multiline: boolean
  editable: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TypographyProps["text"]
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TypographyProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TypographyProps["txOptions"]
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TypographyProps
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TypographyProps["text"]
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TypographyProps["tx"]
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TypographyProps["txOptions"]
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TypographyProps
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TypographyProps["text"]
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TypographyProps["tx"]
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TypographyProps["txOptions"]
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>

  /**
   * Optional color style override when active input.
   */
  activeBorderColor?: string
  /**
   * An optional to clear text input value
   */
  clearRightAccessory?: boolean

  /**
   * Callback that is called when the text input's clear.
   */
  onClear?: () => void | undefined
}

export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
  const {
    labelTx,
    label,
    labelTxOptions,
    placeholderTx,
    placeholder,
    placeholderTxOptions,
    helper,
    helperTx,
    helperTxOptions,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    clearRightAccessory = true,
    onClear,
    editable,
    activeBorderColor = appColors.common.borderHover,
    ...TextInputProps
  } = props
  const input = useRef<TextInput>()

  const isControlled = TextInputProps.value !== undefined
  const validInputValue = isControlled ? TextInputProps.value : TextInputProps.defaultValue

  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(validInputValue)

  const value = isControlled ? TextInputProps.value : uncontrolledValue

  const [isFocus, setIsFocus] = useState(false)

  const disabled = editable === false || status === "disabled"

  const placeholderContent = placeholderTx
    ? translate(placeholderTx, placeholderTxOptions)
    : placeholder

  const $containerStyles = [$containerStyleOverride]

  const $labelStyles = [$labelStyle, LabelTextProps?.style]

  const $inputWrapperStyles = useMemo(() => {
    return [
      $inputWrapperStyle,
      disabled && {
        backgroundColor: appColors.common.interactiveDisabled,
        borderColor: appColors.common.borderDisabled,
      },
      status === "error" && { borderColor: appColors.common.errorDefault },
      !!isFocus && { borderColor: activeBorderColor },
      TextInputProps.multiline && { minHeight: 112 },
      LeftAccessory && { paddingStart: 0 },
      RightAccessory && { paddingEnd: 0 },
      $inputWrapperStyleOverride,
    ]
  }, [isFocus])

  const $inputStyles = [
    $inputStyle,
    disabled && { color: appColors.common.characterSecondary },
    isRTL && { textAlign: "right" as TextStyle["textAlign"] },
    TextInputProps.multiline && { height: "auto" },
    $inputStyleOverride,
  ]

  const $helperStyles = [
    $helperStyle,
    status === "error" && { color: appColors.common.errorDefault },
    HelperTextProps?.style,
  ]

  function focusInput() {
    if (disabled) return

    input.current?.focus()
    setIsFocus(true)
  }

  function clearInput() {
    if (disabled) return

    if (isControlled) {
      onClear?.()
    } else {
      input.current?.clear()
      setUncontrolledValue("")
    }
  }

  useImperativeHandle(ref, () => input.current)

  const ClearRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory() {
        return (
          <TouchableOpacity style={$rightAccessoryStyle} onPress={clearInput}>
            <PhosphorIcon
              size={iconSizes.small}
              name="XCircle"
              color={appColors.common.characterRedDefault}
            />
          </TouchableOpacity>
        )
      },
    [],
  )

  const handleChangeText = (value: string) => {
    if (editable === false || disabled) {
      return
    }
    if (!isControlled) {
      // Keep track of value in local state when input is not controlled
      setUncontrolledValue(value)
    }
    props.onChangeText?.(value)
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {!!(label || labelTx) && (
        <Typography
          preset="label01"
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          {...LabelTextProps}
          style={$labelStyles}
        />
      )}

      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={$leftAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid={appColors.common.bgGrey}
          textAlignVertical="top"
          placeholder={placeholderContent}
          placeholderTextColor={appColors.common.characterPlaceholder}
          value={value}
          {...TextInputProps}
          editable={!disabled}
          style={$inputStyles}
          onChangeText={handleChangeText}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        {((!disabled && !!clearRightAccessory && isControlled && !!props.value?.length) ||
          (!isControlled && !!uncontrolledValue?.length)) && <ClearRightAccessory />}

        {!!RightAccessory && (
          <RightAccessory
            style={$customRightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline}
          />
        )}
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
    </TouchableOpacity>
  )
})

const $labelStyle: TextStyle = {
  marginBottom: spacing.size04,
  color: appColors.common.characterPrimary,
}

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "row",
  borderWidth: 1,
  borderRadius: shape.medium,
  backgroundColor: appColors.palette.neutral0,
  borderColor: appColors.common.borderDefault,
  overflow: "hidden",
  padding: spacing.size08,
}

const $inputStyle: TextStyle = {
  ...typography.body01,
  flex: 1,
  alignSelf: "stretch",
  color: appColors.common.characterSecondary,
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.size04,
  marginHorizontal: spacing.size04,
  textAlignVertical: "center",
  textAlign: "auto",
  lineHeight: Platform.select({
    ios: 0,
    android: typography.body01.lineHeight,
  }),
}

const $helperStyle: TextStyle = {
  marginTop: spacing.size04,
  color: appColors.common.characterTertiary,
}

const $rightAccessoryStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $customRightAccessoryStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginEnd: spacing.size08,
  marginStart: spacing.size12,
}

const $leftAccessoryStyle: ViewStyle = {
  marginStart: spacing.size08,
  justifyContent: "center",
  alignItems: "center",
}
