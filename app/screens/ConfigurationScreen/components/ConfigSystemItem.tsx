import React from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"

import { Button, Icon, Typography } from "app/components"
import { Toggle } from "app/components/Toggle"
import { ToggleProps } from "app/components/Toggle/type"
import { System } from "app/models/system/system"
import { appColors, spacing } from "app/theme"
import { radius } from "app/theme/radius"

export interface ConfigSystemItemProps {
  onHandlePressedButton: (system: System) => void
  system?: System
}

function ControlledToggle(props: ToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Toggle {...props} value={value} onPress={() => setValue(!value)} />
}

export default function ConfigSystemItem({
  system,
  onHandlePressedButton,
}: ConfigSystemItemProps): JSX.Element {
  const confirmAlert = (system: System) => {
    Alert.alert("Confirm", "Are you sure?", [
      {
        text: "Close",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          system.editSystemReceiveLog({ ...system, receiveLog: !system.receiveLog })
        },
      },
    ])
  }

  return (
    <View style={$viewContainer}>
      <View style={$systemContainer}>
        <View style={$titleContainer}>
          <Icon icon="system" />
          <Typography text={system.systemName} preset="body02" style={$titleText} />
        </View>
        <Button
          text="Edit"
          preset="secondary"
          style={$editButton}
          onPress={() => {
            onHandlePressedButton(system)
          }}
        />
      </View>
      <View style={$configBlock}>
        <Typography text="Receive Log" preset="body02" style={$logText} />
        <ControlledToggle
          variant="switch"
          value={system.receiveLog}
          onValueChange={() => {
            confirmAlert(system)
          }}
        />
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

const $titleContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
}

const $systemContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderColor: appColors.palette.black050,
  borderBottomWidth: spacing.size01,
  paddingVertical: spacing.size12,
  paddingHorizontal: spacing.size12,
}

const $configBlock: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: spacing.size12,
  paddingVertical: spacing.size04,
  paddingHorizontal: spacing.size12,
}

const $titleText: TextStyle = {
  color: appColors.common.bgRed,
  marginLeft: spacing.size04,
}

const $editButton: ViewStyle = {
  paddingVertical: spacing.size04,
  paddingLeft: spacing.size12,
  borderRadius: radius.lg,
  borderColor: appColors.common.bgRed,
}

const $logText: TextStyle = {
  ...$titleText,
  color: appColors.palette.black600,
  marginBottom: spacing.size12,
}
