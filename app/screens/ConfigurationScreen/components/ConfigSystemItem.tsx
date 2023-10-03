import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

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
  return (
    <View style={$viewContainer}>
      <View style={$systemContainer}>
        <View style={$titleContainer}>
          <Icon icon="system" />
          <Typography text={system.systemName} preset="body02" style={$titleText} />
        </View>
        <View style={$configBlock}>
          <Button
            text="Edit"
            preset="secondary"
            style={$editButton}
            onPress={() => {
              onHandlePressedButton(system)
            }}
          />
        </View>
      </View>
      <View style={$configBlock}>
        <Typography text="Receive Log" preset="body02" style={$logText} />
        <ControlledToggle variant="switch" value={system.receiveLog} />
      </View>
      {/* <View style={$tagContainer}>
        <View>
          <Typography text="Success" preset="body04" style={$labelText} />
          <Typography
            text={`${system.getCurrentSystem.totalLogInfo}`}
            preset="headline01"
            color={appColors.palette.green400}
            style={$totalLogText}
          />
        </View>
        <View>
          <Typography text="Warning" preset="body04" style={$labelText} />
          <Typography
            text={`${system.getCurrentSystem.totalLogWarn}`}
            preset="headline01"
            color={appColors.palette.yellow400}
            style={$totalLogText}
          />
        </View>
        <View>
          <Typography text="Error" preset="body04" style={$labelText} />
          <Typography
            text={`${system.getCurrentSystem.totalLogError}`}
            preset="headline01"
            color={appColors.palette.red400}
            style={$totalLogText}
          />
        </View>
      </View> */}
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
  paddingHorizontal: spacing.size12,
  paddingVertical: spacing.size12,
}

const $titleContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
}

const $systemContainer: ViewStyle = {
  ...$titleContainer,
  justifyContent: "space-between",
}

const $configBlock: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: spacing.size12,
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
  marginBottom: spacing.size12,
}

const $logText: TextStyle = {
  ...$titleText,
  color: appColors.palette.black600,
  marginBottom: spacing.size12,
}

// const $tagContainer: ViewStyle = {
//   flex: 1,
//   flexDirection: "row",
//   justifyContent: "space-between",
//   padding: spacing.size10,
//   borderRadius: spacing.size08,
//   marginTop: spacing.size10,
// }

// const $labelText: TextStyle = {
//   color: appColors.palette.black600,
// }

// const $totalLogText: TextStyle = {
//   textAlign: "center",
// }
