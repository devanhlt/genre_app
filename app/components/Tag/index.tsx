import React from "react"
import { ColorValue, TextStyle, View, ViewStyle } from "react-native"

import { shape, spacing } from "app/theme"
import Badge from "../Badge"
import { Divider } from "../Divider"
import { IconTypes } from "../Icon/PhosphorIcon"
import { Typography } from "../Typography"

export interface TagProps {
  backgroundColor?: ColorValue
  color?: string
  icon?: IconTypes
  iconSize?: number
  label?: string
  badgeText?: string
  badgeBackgroundColor?: TextStyle["backgroundColor"]
  badgeBorderRadius?: TextStyle["borderRadius"]
  badgeTextColor?: TextStyle["color"]
}

function Tag({
  backgroundColor,
  color,
  label = "",
  badgeText = "",
  badgeBackgroundColor,
  badgeTextColor,
  badgeBorderRadius,
}: TagProps) {
  return (
    <View style={$viewStyle}>
      <View
        style={[
          $tagStyle,
          {
            backgroundColor,
          },
        ]}
      >
        <Typography preset="label01" text={label} color={color} style={$labelStyle} />
        {!!badgeText && (
          <>
            <Divider size={5} type="vertical" />
            <Badge
              textColor={badgeTextColor}
              backgroundColor={badgeBackgroundColor}
              borderRadius={badgeBorderRadius}
            >
              {badgeText}
            </Badge>
          </>
        )}
      </View>
    </View>
  )
}

const $viewStyle: ViewStyle = {
  flexDirection: "row",
}

const $tagStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: spacing.size08,
  paddingVertical: spacing.size02,
  borderRadius: shape.small,
}

const $labelStyle: ViewStyle = {
  marginStart: spacing.size04,
}

export default Tag
