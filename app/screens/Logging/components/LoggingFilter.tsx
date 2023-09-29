import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Button, Typography } from "app/components"
import { spacing } from "app/theme"
import { SafeAreaView } from "react-native-safe-area-context"

type Logging = {
  system?: string
  baseUrl?: string
  successValue?: number
  warningValue?: number
  errorValue?: number
}

export interface LoggingFilterProps {
  item?: Logging
  onClose?: () => void
}

export default function LoggingFilter(): JSX.Element {
  return (
    <View style={$viewContainer}>
      <View style={$contentContainer}>
        <Typography text="Event time: 2023-09-28 09:55:35" preset="body02" style={$titleText} />
        <Typography text="System: GENLINK_API" preset="body02" style={$titleText} />
        <Typography text="Type: INFO" preset="body02" style={$titleText} />
        <Typography text="Message: OK" preset="body02" style={$titleText} />
      </View>

      <Button text="Apply" />
      <SafeAreaView edges={["bottom"]} />
    </View>
  )
}

const $viewContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.size16,
}
const $contentContainer: ViewStyle = {
  flex: 1,
}

const $titleText: TextStyle = {}
