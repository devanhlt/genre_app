import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Icon, Typography } from "app/components"
import { System } from "app/models/system/system"
import { appColors, spacing } from "app/theme"
import { radius } from "app/theme/radius"

export interface DashboardSystemItemProps {
  item?: System
}

export default function DashboardSystemItem({ item }: DashboardSystemItemProps): JSX.Element {
  console.log("item:", item.getCurrentHeaderColor)
  const headerColor = item.getCurrentHeaderColor
  return (
    <View style={$viewContainer}>
      <View style={[$headerContainer, { backgroundColor: headerColor }]}>
        <Icon icon="system" />
        <Typography
          text={item.getCurrentSystem.systemName}
          preset="body04"
          style={$titleText}
          color={appColors.palette.neutral0}
        />
      </View>
      <View style={$tagContainer}>
        <View>
          <Typography text="Success" preset="body04" style={$labelText} />
          <Typography
            text={`${item.getCurrentSystem.totalLogInfo}`}
            preset="headline01"
            color={appColors.palette.green400}
            style={$totalLogText}
          />
        </View>
        <View>
          <Typography text="Warning" preset="body04" style={$labelText} />
          <Typography
            text={`${item.getCurrentSystem.totalLogWarn}`}
            preset="headline01"
            color={appColors.palette.yellow400}
            style={$totalLogText}
          />
        </View>
        <View>
          <Typography text="Error" preset="body04" style={$labelText} />
          <Typography
            text={`${item.getCurrentSystem.totalLogError}`}
            preset="headline01"
            color={appColors.palette.red400}
            style={$totalLogText}
          />
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
  shadowOpacity: 0.1,
  shadowRadius: radius.md,
  elevation: 16,
  marginBottom: spacing.size16,
}

const $tagContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-around",
  padding: spacing.size10,
  borderRadius: spacing.size08,
  marginTop: spacing.size10,
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: appColors.palette.red,
  paddingHorizontal: spacing.size08,
  paddingVertical: spacing.size08,
  borderTopRightRadius: radius.xs,
  borderTopLeftRadius: radius.xs,
}

const $titleText: TextStyle = {
  marginLeft: spacing.size16,
}

const $labelText: TextStyle = {
  color: appColors.palette.black600,
}

const $totalLogText: TextStyle = {
  textAlign: "center",
}
