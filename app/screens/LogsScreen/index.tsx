import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"

import { Screen, Typography } from "app/components"
import { MainTabScreenProps } from "app/navigators/MainNavigator"
import { spacing } from "app/theme"

interface LogsScreenProps extends MainTabScreenProps<"DashboardScreen"> {}

export const LogsScreen: FC<LogsScreenProps> = observer(function LogsScreen(_props) {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Typography tx="loginScreen.enterDetails" preset="body02" style={$enterDetails} />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.size48,
  paddingHorizontal: spacing.size24,
}
const $enterDetails: TextStyle = {
  marginBottom: spacing.size24,
}
