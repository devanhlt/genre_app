import React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import DatePicker from "react-native-date-picker"
import { formatDate, isValidDate } from "app/utils/formatDate"
import { Typography, TypographyProps } from "../Typography"
import { appColors, iconSizes, shape, spacing } from "app/theme"
import { PhosphorIcon } from "../Icon/PhosphorIcon"
import { Divider } from "../Divider"

export interface DatePickerFieldProps {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * One of the different types of button presets.
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
   * The `multiple` is an optional prop that is used for multiple date picker selections
   *
   */
  multiple?: boolean

  fromDate?: Date
  toDate?: Date
  onChangeFromDate?: (date?: Date) => void
  onChangeToDate?: (date?: Date) => void
}

function DatePickerField({
  helperTx,
  HelperTextProps,
  helperTxOptions,
  helper,
  status,
  label,
  labelTx,
  labelTxOptions,
  LabelTextProps,
  multiple,
  fromDate = null,
  toDate = null,
  onChangeFromDate = () => null,
  onChangeToDate = () => null,
}: DatePickerFieldProps) {
  const [firstDate, setFirstDate] = React.useState(fromDate)
  const [secondDate, setSecondDate] = React.useState(toDate)
  const [openFirstDate, setOpenFirstDate] = React.useState(false)
  const [openSecondDate, setOpenSecondDate] = React.useState(false)

  const $firstDateStyles = [
    $dateStyle,
    isValidDate(firstDate) && ({ color: appColors.common.characterSecondary } as TextStyle),
  ]

  const $secondDateStyles = [
    $dateStyle,
    isValidDate(secondDate) && ({ color: appColors.common.characterSecondary } as TextStyle),
  ]

  const $helperStyles = [
    $helperStyle,
    status === "error" && { color: appColors.common.errorDefault },
    HelperTextProps?.style,
  ]

  const $containerInputStyles = [
    $containerInputStyle,
    status === "disabled" && { backgroundColor: appColors.common.interactiveDisabled },
    status === "error" && { borderColor: appColors.common.errorDefault },
    HelperTextProps?.style,
  ]

  const $labelStyles = [$labelStyle, LabelTextProps?.style]

  const disabled = status === "disabled"

  return (
    <View style={$containerStyles}>
      <DatePicker
        modal
        mode="date"
        open={openFirstDate}
        date={firstDate || new Date()}
        locale="en"
        onConfirm={(date) => {
          setOpenFirstDate(false)
          setFirstDate(date)
          onChangeFromDate(date)
        }}
        onCancel={() => {
          setOpenFirstDate(false)
        }}
        maximumDate={secondDate || new Date()}
      />
      <DatePicker
        modal
        mode="date"
        open={openSecondDate}
        date={secondDate || new Date()}
        minimumDate={firstDate}
        locale="en"
        onConfirm={(date) => {
          setOpenSecondDate(false)
          setSecondDate(date)
          onChangeToDate(date)
        }}
        onCancel={() => {
          setOpenSecondDate(false)
        }}
      />

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
      <View style={$containerInputStyles}>
        <TouchableOpacity
          style={$inputWrapperStyle}
          onPress={() => setOpenFirstDate(true)}
          disabled={disabled}
        >
          <PhosphorIcon
            name="CalendarBlank"
            size={iconSizes.small}
            color={appColors.common.characterPlaceholder}
          />
          <Typography
            style={$firstDateStyles}
            preset="body01"
            text={isValidDate(firstDate) ? formatDate(firstDate.toISOString()) : "YYYY-MM-DD"}
          />
        </TouchableOpacity>
        {!!multiple && <Divider style={$divider} type="vertical" />}
        {!!multiple && (
          <TouchableOpacity
            style={$inputWrapperStyle}
            onPress={() => setOpenSecondDate(true)}
            disabled={disabled}
          >
            <PhosphorIcon
              name="CalendarBlank"
              size={iconSizes.small}
              color={appColors.common.characterPlaceholder}
            />
            <Typography
              style={$secondDateStyles}
              preset="body01"
              text={isValidDate(secondDate) ? formatDate(secondDate.toISOString()) : "YYYY-MM-DD"}
            />
          </TouchableOpacity>
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
    </View>
  )
}

const $containerStyles: ViewStyle = {
  flex: 1,
}
const $containerInputStyle: ViewStyle = {
  flexDirection: "row",
  borderWidth: 1,
  borderRadius: shape.medium,
  borderColor: appColors.common.borderDefault,
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
}

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "row",
  borderColor: appColors.common.borderDefault,
  overflow: "hidden",
  alignItems: "center",
  flex: 1,
  padding: spacing.size12,
}

const $labelStyle: TextStyle = {
  marginBottom: spacing.size04,
  color: appColors.common.characterPrimary,
}

const $helperStyle: TextStyle = {
  marginTop: spacing.size04,
  color: appColors.common.characterTertiary,
}

const $dateStyle: TextStyle = {
  marginStart: spacing.size08,
  color: appColors.common.characterPlaceholder,
}
const $divider: TextStyle = {
  backgroundColor: appColors.common.borderDefault,
  width: 1,
  height: "100%",
}

export default DatePickerField
