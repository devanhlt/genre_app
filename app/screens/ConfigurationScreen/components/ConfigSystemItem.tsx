import React, { useState } from "react"
import { Button, Pressable, Switch, TextStyle, View, ViewStyle } from "react-native"

import { Typography } from "app/components"
import { appColors, spacing } from "app/theme"

export interface ConfigSystemItemProps {
  system?: string
  baseUrl?: string
  successValue?: number
  warningValue?: number
  errorValue?: number
}

export default function ConfigSystemItem({ system }: ConfigSystemItemProps): JSX.Element {
  const [isEnabled, setIsEnabled] = useState(false)

  const onPressed = () => {
    setIsEnabled((previousState) => !previousState)
  }

  return (
    <Pressable style={$viewContainer}>
      <View>
        <Typography text="System" preset="body01" style={$titleText} />
        <Typography text={system ?? "PLACEHOLDER_SYS"} preset="headline02" style={$titleText} />
      </View>
      <View style={$flexDirectionRow}>
        <View style={$configBlock}>
          <Typography text="Receive Log" preset="body01" style={$titleText} />
          <Switch
            trackColor={{ false: appColors.common.bgWhite, true: appColors.common.borderFocus }}
            thumbColor={
              isEnabled
                ? appColors.components.button.secondary
                : appColors.components.button.disabled
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={onPressed}
            value={isEnabled}
          />
        </View>
        <View style={$configBlock}>
          <Typography text="Action" preset="body01" style={$titleText} />
          <Button title="Edit" color={appColors.components.button.primary} />
        </View>
      </View>
    </Pressable>
  )
}

const $flexDirectionRow: ViewStyle = {
  flexDirection: "row",
}

const $viewContainer: ViewStyle = {
  ...$flexDirectionRow,
  backgroundColor: appColors.palette.neutral100,
  padding: spacing.size10,
  marginBottom: spacing.size10,
  borderRadius: spacing.size10,
  borderColor: appColors.palette.black200,
  borderWidth: 1,
  justifyContent: "space-between",
}

const $configBlock: ViewStyle = {
  alignItems: "center",
  margin: spacing.size04,
}

const $titleText: TextStyle = {
  color: appColors.palette.black600,
}
