import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"

import { Typography } from "app/components/Typography"
import { Divider } from "app/components/Divider"
import { If } from "app/components/If"
import { Pressable } from "app/components/Pressable"
import { User } from "app/models/users/user"
import { appColors, spacing } from "app/theme"
import { responsiveWidth } from "app/utils/screens"

export interface UserItemProps {
  item?: User
  onPressItem?: (item: User) => void
}

export default function UserItem({ item }: UserItemProps): JSX.Element {
  if (!item) return null

  return (
    <Swipeable key={`user-item-${item.userName}`} renderRightActions={LeftSwipeActions}>
      <View style={$viewContainer}>
        <View style={$rowItem}>
          <Typography text="Full name:" preset="body03" style={$titleText} />
          <Divider size={spacing.size12} type="vertical" />
          <Typography text={item.fullName} preset="body03" style={$valueText} />
        </View>
        <View style={$rowItem}>
          <Typography text="Username:" preset="support01" style={$titleText} />
          <Divider size={spacing.size12} type="vertical" />
          <Typography text={item.userName} preset="support01" style={$valueText} />
        </View>
        <If condition={!!item.email}>
          <View style={$rowItem}>
            <Typography text="Email:" preset="support01" style={$titleText} />
            <Divider size={spacing.size12} type="vertical" />
            <Typography text={item.email} preset="support01" style={$valueText} />
          </View>
        </If>
      </View>
    </Swipeable>
  )
}

const LeftSwipeActions = () => {
  return (
    <View style={$leftSwipeActions}>
      <Pressable style={$actionButtonAllow}>
        <Typography
          text={"Allow admin"}
          preset="body02"
          color={appColors.palette.neutral0}
          style={$valueText}
        />
      </Pressable>
      <Pressable style={$actionButtonActive}>
        <Typography
          text={"Active"}
          preset="body02"
          color={appColors.palette.neutral0}
          style={$valueText}
        />
      </Pressable>
    </View>
  )
}

const $viewContainer: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: appColors.common.borderDivider,
  paddingVertical: spacing.size08,
  backgroundColor: appColors.common.bgWhite,
  paddingHorizontal: spacing.size16,
}

const $leftSwipeActions: ViewStyle = {
  flexDirection: "row",
  backgroundColor: appColors.palette.neutral300,
}

const $actionButtonAllow: ViewStyle = {
  backgroundColor: appColors.palette.neutral400,
  alignItems: "center",
  justifyContent: "center",
}

const $actionButtonActive: ViewStyle = {
  backgroundColor: appColors.palette.green300,
  alignItems: "center",
  justifyContent: "center",
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
