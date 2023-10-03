import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Typography } from "app/components"
import Badge from "app/components/Badge"
import { Divider } from "app/components/Divider"
import { Pressable } from "app/components/Pressable"
import { Logging } from "app/models/system/logging"
import { appColors, spacing } from "app/theme"
import { formatDate } from "app/utils/formatDate"
import { responsiveWidth } from "app/utils/screens"

export interface LoggingItemProps {
  item?: Logging
  onPressItem?: (item: Logging) => void
}

export default function LoggingItem({
  item,
  onPressItem = () => null,
}: LoggingItemProps): JSX.Element {
  const handlePressItem = () => {
    onPressItem?.(item)
  }

  if (!item) return null

  return (
    <Pressable style={$viewContainer} onPress={handlePressItem}>
      <View style={$logTypeView}>
        <Badge
          textColor={"#fff"}
          backgroundColor={item.color || appColors.common.bgRed}
          borderRadius={4}
        >
          {item.logType}
        </Badge>
      </View>
      <View style={$rowItem}>
        <Typography text="System:" preset="body04" style={$titleText} />
        <Divider size={spacing.size12} type="vertical" />
        <Typography text={item.systemName} preset="body04" style={$valueText} />
      </View>

      {/* <View style={$rowItem}>
        <Typography text="Message:" preset="body04" style={$titleText} />
        <Divider size={spacing.size12} type="vertical" />
        <Typography
          text={jsonToString(stringToJson(item?.logDetail || "{}"))}
          preset="body02"
          style={$valueText}
          numberOfLines={3}
        />
      </View> */}
      <View style={$rowItem}>
        <Typography text="Event time:" preset="body04" style={$titleText} />
        <Divider size={spacing.size12} type="vertical" />
        <Typography
          text={`${formatDate(new Date(item.createdDate).toISOString(), "yyyy-MM-dd HH:mm:ss")}`}
          preset="body02"
          style={$valueText}
        />
      </View>
    </Pressable>
  )
}

const $viewContainer: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: appColors.common.borderDivider,
  paddingVertical: spacing.size08,
  backgroundColor: appColors.common.bgWhite,
}

const $titleText: TextStyle = {
  minWidth: responsiveWidth(75),
}

const $valueText: TextStyle = {
  flexWrap: "wrap",
  overflow: "hidden",
}

const $rowItem: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  overflow: "hidden",
}

const $logTypeView: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
}
