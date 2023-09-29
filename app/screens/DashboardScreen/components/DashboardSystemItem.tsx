import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Typography } from "app/components"
import Tag from "app/components/Tag"
import { System } from "app/models/system/system"

export interface DashboardSystemItemProps {
  item?: System
}

export default function DashboardSystemItem({ item }: DashboardSystemItemProps): JSX.Element {
  return (
    <View style={$viewContainer}>
      <Typography text={`System: ${item.systemName}`} preset="body02" style={$titleText} />
      <Typography text={`Base URL: ${item.baseUrl}`} preset="body02" style={$titleText} />
      <View style={$tagContainer}>
        <Tag
          backgroundColor={"#fff"}
          label="Success"
          badgeText={`${item.totalLogInfo}`}
          badgeTextColor={"#fff"}
          badgeBackgroundColor={"#388E3C"}
          badgeBorderRadius={8}
        />
        <Tag
          backgroundColor={"#fff"}
          label="Warning"
          badgeText={`${item.totalLogWarn}`}
          badgeTextColor={"#fff"}
          badgeBackgroundColor={"#388E3C"}
          badgeBorderRadius={8}
        />
        <Tag
          backgroundColor={"#fff"}
          label="Error"
          badgeText={`${item.totalLogError}`}
          badgeTextColor={"#fff"}
          badgeBackgroundColor={"#388E3C"}
          badgeBorderRadius={8}
        />
      </View>
    </View>
  )
}

const $viewContainer: ViewStyle = {
  backgroundColor: "#388E3C",
  padding: 10,
  marginBottom: 10,
  borderRadius: 10,
}

const $tagContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  flexDirection: "row",
  marginTop: 10,
}
const $titleText: TextStyle = {
  color: "#fff",
}
