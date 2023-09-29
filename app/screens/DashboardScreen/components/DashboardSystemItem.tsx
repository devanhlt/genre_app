import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Icon, Typography } from "app/components"
import Tag from "app/components/Tag"
import { appColors, spacing } from "app/theme"
import { System } from "app/models/system/system"

export interface DashboardSystemItemProps {
  item?: System
}

export default function DashboardSystemItem({ item }: DashboardSystemItemProps): JSX.Element {
  return (
    <View style={$viewContainer}>
      <View style={$titleRow}>
        <View style={$titleRowTitle}>
          <Icon icon="system" />
          <Typography text={item.getSystem.systemName} preset="body02" style={$titleText} />
        </View>
        <Tag backgroundColor={"#D2F1D2"} color={"#1CC800"} label="Active" badgeBorderRadius={4} />
      </View>
      <View style={$tagContainer}>
        <View>
          <Typography text="Success" preset="body02" style={$labelText} />
          <Typography
            text={item.getSystem.totalLogInfo?.toString()}
            preset="body02"
            color={appColors.palette.green400}
          />
        </View>
        <View>
          <Typography text="Warning" preset="body02" style={$labelText} />
          <Typography
            text={item.getSystem.totalLogWarn?.toString()}
            preset="body02"
            color={appColors.palette.yellow400}
          />
        </View>
        <View>
          <Typography text="Error" preset="body02" style={$labelText} />
          <Typography
            text={item.getSystem.totalLogWarn?.toString()}
            preset="body02"
            color={appColors.palette.red400}
          />
        </View>
      </View>
    </View>
  )
}

const $viewContainer: ViewStyle = {
  padding: spacing.size10,
  marginBottom: spacing.size16,
  borderRadius: spacing.size10,
  borderWidth: spacing.size01,
  borderColor: appColors.palette.black050,
  backgroundColor: appColors.common.bgWhite,
}

const $tagContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  padding: spacing.size10,
  borderRadius: spacing.size08,
  marginTop: spacing.size10,
  backgroundColor: appColors.common.bgGrey,
}

const $titleRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $titleRowTitle: ViewStyle = {
  ...$titleRow,
  alignItems: "center",
}

const $titleText: TextStyle = {
  color: appColors.palette.red,
  marginLeft: spacing.size04,
}

const $labelText: TextStyle = {
  color: appColors.palette.black600,
}
