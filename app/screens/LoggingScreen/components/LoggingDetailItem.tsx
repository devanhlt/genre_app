import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Typography } from "app/components"
import { appColors, boldType, spacing } from "app/theme"

export interface LoggingDetailItemProps {
  field?: string
  value?: string
  descriptionStyle?: TextStyle
}

export default function LoggingDetailItem({
  value = "",
  field = "",
  descriptionStyle: $descriptionStyleOverride,
}: LoggingDetailItemProps): JSX.Element {
  return (
    <View style={$viewContainer}>
      <Typography text={field} preset="body02" style={$titleText} />
      <Typography
        text={value}
        preset="body02"
        style={[$descriptionText, $descriptionStyleOverride]}
      />
    </View>
  )
}

const $viewContainer: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: appColors.common.borderDivider,
  paddingHorizontal: spacing.size16,
  paddingVertical: spacing.size08,
  backgroundColor: appColors.common.bgWhite,
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
}

const $titleText: TextStyle = {
  ...boldType,
  minWidth: 100,
}
const $descriptionText: TextStyle = {
  flex: 1,
  marginLeft: spacing.size16,
}
