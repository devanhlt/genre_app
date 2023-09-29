import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"

import { Button, Icon, Screen, Typography } from "app/components"
import { appColors, spacing } from "app/theme"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <Icon icon="heart" size={64} />
        <Typography style={$heading} tx="errorScreen.title" />
        <Typography tx="errorScreen.friendlySubtitle" />
      </View>

      <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
        <Typography style={$errorContent} text={`${props.error}`.trim()} />
        <Typography
          selectable
          style={$errorBacktrace}
          text={`${props.errorInfo.componentStack}`.trim()}
        />
      </ScrollView>

      <Button
        preset="primary"
        style={$resetButton}
        onPress={props.onReset}
        tx="errorScreen.reset"
      />
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.size24,
  paddingTop: spacing.size32,
  flex: 1,
}

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $heading: TextStyle = {
  color: appColors.common.errorDefault,
  marginBottom: spacing.size16,
}

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: appColors.common.borderDefault,
  marginVertical: spacing.size16,
  borderRadius: 6,
}

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.size16,
}

const $errorContent: TextStyle = {
  color: appColors.common.errorDefault,
}

const $errorBacktrace: TextStyle = {
  marginTop: spacing.size16,
  color: appColors.common.characterRedDefault,
}

const $resetButton: ViewStyle = {
  backgroundColor: appColors.common.errorDefault,
  paddingHorizontal: spacing.size48,
}
