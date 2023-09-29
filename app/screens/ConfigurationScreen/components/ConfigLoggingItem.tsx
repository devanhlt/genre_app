import React from "react"
import { Button, Pressable, TextStyle, View, ViewStyle } from "react-native"

import { Typography } from "app/components"
import { appColors, spacing } from "app/theme"

export interface ConfigLoggingItemProps {
  level: string
  color: string
  name?: string
  baseUrl?: string
  successValue?: number
  warningValue?: number
  errorValue?: number
}

export default function ConfigLoggingItem({
  level,
  color,
  name,
}: ConfigLoggingItemProps): JSX.Element {
  const blockColor: ViewStyle = { backgroundColor: color }
  return (
    <Pressable style={$viewContainer}>
      <View>
        <Typography text={`Log Level ${level}`} preset="body01" style={$titleText} />
        <Typography text={name ?? "PLACEHOLDER"} preset="headline02" style={$titleText} />
      </View>
      <View style={$flexDirectionRow}>
        <View style={$editBlock}>
          <Typography text="Color" preset="body01" style={$titleText} />
          <View style={[$blockStyle, blockColor]} />
        </View>
        <View style={$editBlock}>
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
  borderWidth: spacing.size01,
  justifyContent: "space-between",
}

const $blockStyle: ViewStyle = {
  width: spacing.size24,
  height: spacing.size24,
  borderRadius: spacing.size04,
  marginTop: spacing.size08,
}

const $editBlock: ViewStyle = {
  alignItems: "center",
  marginLeft: spacing.size04,
}

const $titleText: TextStyle = {
  color: appColors.palette.black600,
}
