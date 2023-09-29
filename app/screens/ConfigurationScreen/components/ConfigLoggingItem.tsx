import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Button, Typography } from "app/components"
import { Toggle } from "app/components/Toggle"
import { ToggleProps } from "app/components/Toggle/type"
import { Setting } from "app/models/setting/setting"
import { appColors, spacing } from "app/theme"
import { radius } from "app/theme/radius"

export interface ConfigLoggingItemProps {
  setting?: Setting
}

function ControlledToggle(props: ToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return (
    <Toggle
      {...props}
      value={value}
      onPress={() => setValue(!value)}
      containerStyle={$toggleContainer}
    />
  )
}

export default function ConfigLoggingItem({ setting }: ConfigLoggingItemProps): JSX.Element {
  return (
    <View style={$viewContainer}>
      <View style={[$headerContainer, { backgroundColor: setting.color }]}>
        <Typography
          text={`Level ${setting.logLevel}`}
          preset="headline02"
          style={$titleText}
          color={appColors.palette.neutral0}
        />
        <Typography
          text={`${setting.description}`}
          preset="body03"
          style={$titleText}
          color={appColors.palette.neutral0}
        />
      </View>
      <View style={$tagContainer}>
        <View style={$configBlock}>
          <Typography text="Receive Log" preset="body01" style={$titleText} />
          <ControlledToggle variant="switch" />
        </View>
        <View style={$configBlock}>
          <Typography text="Receive Log" preset="body01" style={$titleText} />
          <ControlledToggle variant="switch" />
        </View>
        <View style={$configBlock}>
          <Typography text="Action" preset="body01" style={$titleText} />
          <Button text="Edit" preset="tertiary" style={$toggleContainer} />
        </View>
      </View>
    </View>
  )
}

const $viewContainer: ViewStyle = {
  borderWidth: spacing.size01,
  borderRadius: spacing.size08,
  borderColor: appColors.palette.black050,
  backgroundColor: appColors.common.bgWhite,
  shadowColor: appColors.palette.neutral800,
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.05,
  shadowRadius: radius.md,
  elevation: 16,
  marginBottom: spacing.size16,
}

const $toggleContainer: ViewStyle = {
  height: 50,
  alignItems: "center",
  justifyContent: "center",
}

const $headerContainer: ViewStyle = {
  padding: spacing.size10,
  marginBottom: spacing.size10,
  alignItems: "center",
  borderBottomColor: appColors.palette.black050,
  borderBottomWidth: spacing.size02,
  borderTopRightRadius: spacing.size08,
  borderTopLeftRadius: spacing.size08,
}

const $configBlock: ViewStyle = {
  alignItems: "center",
}

const $titleText: TextStyle = {
  marginBottom: spacing.size04,
}

const $tagContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: spacing.size12,
  paddingVertical: spacing.size16,
  alignItems: "center",
}
