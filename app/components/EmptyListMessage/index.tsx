import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Typography } from "app/components"

export interface EmptyListMessageProps {
  message?: string
  isLoading?: boolean
}

export default function EmptyListMessage({
  message = "No data available!",
  isLoading,
}: EmptyListMessageProps): JSX.Element {
  return (
    <View style={$viewContainer}>
      <Typography text={isLoading ? "Loading..." : message} preset="body02" style={$messageText} />
    </View>
  )
}

const $viewContainer: ViewStyle = {}

const $messageText: TextStyle = {
  textAlign: "center",
}
