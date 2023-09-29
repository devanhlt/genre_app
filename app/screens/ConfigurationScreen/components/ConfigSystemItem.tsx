import React from "react"
import { Button, TextStyle, View, ViewStyle } from "react-native"

import { Typography } from "app/components"
import { Toggle } from "app/components/Toggle"
import { ToggleProps } from "app/components/Toggle/type"
import { System } from "app/models/system/system"
import { appColors, spacing } from "app/theme"
import { radius } from "app/theme/radius"

export interface ConfigSystemItemProps {
  system?: System
}

function ControlledToggle(props: ToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Toggle {...props} value={value} onPress={() => setValue(!value)} />
}

export default function ConfigSystemItem({ system }: ConfigSystemItemProps): JSX.Element {
  return (
    <View style={$viewContainer}>
      <View style={$headerContainer}>
        <View style={$systemContainer}>
          <Typography text="System" preset="body01" style={$titleText} />
          <Typography text={system.systemName} preset="headline02" style={$titleText} />
        </View>
        <View style={$actionContainer}>
          <View style={$configBlock}>
            <Typography
              text="Receive Log"
              preset="body01"
              style={[$titleText, { marginBottom: spacing.size12 }]}
            />
            <ControlledToggle variant="switch" />
          </View>
          <View style={$configBlock}>
            <Typography text="Action" preset="body01" style={$titleText} />
            <Button title="Edit" color={appColors.components.button.primary} />
          </View>
        </View>
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
}

const $systemContainer: ViewStyle = {}

const $actionContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  flex: 1,
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  padding: spacing.size10,
  marginBottom: spacing.size10,
  alignItems: "center",
  // borderBottomColor: appColors.palette.black050,
  // borderBottomWidth: spacing.size02,
}

const $configBlock: ViewStyle = {
  alignItems: "center",
  marginStart: spacing.size16,
}

const $titleText: TextStyle = {
  color: appColors.palette.black600,
  marginBottom: spacing.size08,
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
