import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Typography } from "app/components"
import Tag from "app/components/Tag"

export interface DashboardSystemItemProps {
  system?: string
  baseUrl?: string
  successValue?: number
  warningValue?: number
  errorValue?: number
}

export default function DashboardSystemItem(): JSX.Element {
  return (
    <View style={$viewContainer}>
      <Typography text="System: EKYC_API" preset="body02" style={$titleText} />
      <Typography
        text="Base URL: https://apigw01.generali-life.com.vn:8443/ekyc-api"
        preset="body02"
        style={$titleText}
      />
      <View style={$tagContainer}>
        <Tag
          backgroundColor={"#fff"}
          label="Success"
          badgeText="3"
          badgeTextColor={"#fff"}
          badgeBackgroundColor={"#388E3C"}
          badgeBorderRadius={8}
        />
        <Tag backgroundColor={"#fff"} label="Warn" />
        <Tag backgroundColor={"#fff"} label="Error" />
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
