import { appColors, spacing } from "app/theme"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import RNToastMessage, { BaseToast, ErrorToast } from "react-native-toast-message"
import { PhosphorIcon } from "../Icon/PhosphorIcon"

const toastColorConfigs = {
  success: {
    leadingIcon: appColors.palette.green300,
    trailingIcon: appColors.palette.green300,
    text1Style: appColors.palette.green300,
    text2Style: appColors.palette.green300,
    borderLeftColor: appColors.palette.green300,
  },
  info: {
    leadingIcon: appColors.palette.blue300,
    trailingIcon: appColors.palette.blue300,
    text1Style: appColors.palette.blue300,
    text2Style: appColors.palette.blue300,
    borderLeftColor: appColors.palette.blue300,
  },
  error: {
    leadingIcon: appColors.palette.red300,
    trailingIcon: appColors.palette.red300,
    text1Style: appColors.palette.red300,
    text2Style: appColors.palette.red300,
    borderLeftColor: appColors.palette.red300,
  },
}

/**
 * Toast configs
 */
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={[$baseStyles, $successStyles]}
      contentContainerStyle={$baseContentContainerStyle}
      text1Style={[$baseSubtextStyles, $successTitleStyles]}
      renderLeadingIcon={() => (
        <View style={$baseLeadingIconStyles}>
          {/* <Icon icon="check" color={toastColorConfigs.success.leadingIcon} /> */}
          <PhosphorIcon name="CheckCircle" color={toastColorConfigs.success.leadingIcon} />
        </View>
      )}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={[$baseStyles, $infoStyles]}
      contentContainerStyle={$baseContentContainerStyle}
      text1Style={[$baseSubtextStyles, $infoTitleStyles]}
      renderLeadingIcon={() => (
        <View style={$baseLeadingIconStyles}>
          <PhosphorIcon name="Info" color={toastColorConfigs.info.leadingIcon} />
        </View>
      )}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={[$baseStyles, $errorStyles]}
      contentContainerStyle={$baseContentContainerStyle}
      text1Style={[$baseSubtextStyles, $errorTitleStyles]}
      renderLeadingIcon={() => (
        <View style={$baseLeadingIconStyles}>
          <PhosphorIcon name="Warning" color={toastColorConfigs.error.leadingIcon} />
        </View>
      )}
    />
  ),
}

export const ToastMessage = () => {
  return <RNToastMessage config={toastConfig} />
}

const $baseStyles: ViewStyle = {}
const $successStyles: ViewStyle = {
  borderLeftColor: toastColorConfigs.success.borderLeftColor,
}
const $infoStyles: ViewStyle = {
  borderLeftColor: toastColorConfigs.info.borderLeftColor,
}
const $errorStyles: ViewStyle = {
  borderLeftColor: toastColorConfigs.error.borderLeftColor,
}

const $baseContentContainerStyle: ViewStyle = {
  paddingHorizontal: spacing.size08,
}

const $baseLeadingIconStyles: ViewStyle = {
  justifyContent: "center",
  marginLeft: spacing.size08,
}

const $baseSubtextStyles: TextStyle = {}

const $successTitleStyles: TextStyle = {
  color: toastColorConfigs.success.text1Style,
}
const $infoTitleStyles: TextStyle = {
  color: toastColorConfigs.info.text1Style,
}
const $errorTitleStyles: TextStyle = {
  color: toastColorConfigs.error.text1Style,
}
