/* eslint-disable  react-native/no-inline-styles */
import { appColors } from "app/theme"
import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"

interface DemoDividerProps {
  type?: "vertical" | "horizontal"
  size?: number
  style?: StyleProp<ViewStyle>
  line?: boolean
}

export function Divider(props: DemoDividerProps) {
  const { type = "horizontal", size = 10, line = false, style: $styleOverride } = props

  return (
    <View
      style={[
        $divider,
        type === "horizontal" && { height: size },
        type === "vertical" && { width: size },
        $styleOverride,
      ]}
    >
      {line && (
        <View
          style={[
            $line,
            type === "horizontal" && {
              width: 150,
              height: 1,
              marginStart: -75,
              marginTop: -1,
            },
            type === "vertical" && {
              height: 50,
              width: 1,
              marginTop: -25,
              marginStart: -1,
            },
          ]}
        />
      )}
    </View>
  )
}

const $divider: ViewStyle = {
  flexGrow: 0,
  flexShrink: 0,
}

const $line: ViewStyle = {
  backgroundColor: appColors.common.borderDefault,
  position: "absolute",
  left: "50%",
  top: "50%",
}
