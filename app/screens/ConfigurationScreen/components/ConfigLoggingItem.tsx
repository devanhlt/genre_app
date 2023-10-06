import React from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"

import { Button, Typography } from "app/components"
import { Toggle } from "app/components/Toggle"
import { Setting } from "app/models/setting/setting"
import { appColors, spacing } from "app/theme"
import { radius } from "app/theme/radius"
import { responsiveHeight, responsiveWidth } from "app/utils/screens"
import { observer } from "mobx-react-lite"

export interface ConfigLoggingItemProps {
  onEdit: (setting: Setting) => void
  onUpdate: (setting: Setting) => void
  setting?: Setting
}

export default observer(function ConfigLoggingItem({
  onEdit,
  onUpdate,
  setting,
}: ConfigLoggingItemProps): JSX.Element {
  const onToggleSendEmail = () => {
    Alert.alert("Confirm", "Are you sure?", [
      {
        text: "Close",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          onUpdate({ ...setting, sendEmail: !setting.sendEmail })
        },
      },
    ])
  }

  const onToggleSendSms = () => {
    Alert.alert("Confirm", "Are you sure?", [
      {
        text: "Close",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          onUpdate({ ...setting, sendSms: !setting.sendSms })
        },
      },
    ])
  }

  const handleEditButton = () => onEdit(setting)

  return (
    <View style={$viewContainer}>
      <View style={$headerContainer}>
        <View>
          <Typography
            text={`Level ${setting.logLevel}`}
            preset="headline02"
            style={$titleText}
            color={appColors.palette.neutral0}
          />
          <Typography
            text={`${setting.description}`}
            preset="body03"
            style={$titleText}
            color={appColors.palette.neutral0}
          />
        </View>
        <Button text="Edit" preset="secondary" style={$editButton} onPress={handleEditButton} />
      </View>
      <View style={$tagContainer}>
        <View style={$configBlock}>
          <Typography text="Color" preset="body01" style={$titleText} />
          <View style={[$colorContainer, { backgroundColor: setting.color }]} />
        </View>
        <View style={$configBlock}>
          <Typography text="Send Email" preset="body01" style={$titleText} />
          <Toggle variant="switch" value={setting.sendEmail} onValueChange={onToggleSendEmail} />
        </View>
        <View style={$configBlock}>
          <Typography text="Send SMS" preset="body01" style={$titleText} />
          <Toggle variant="switch" value={setting.sendSms} onValueChange={onToggleSendSms} />
        </View>
      </View>
    </View>
  )
})

const $viewContainer: ViewStyle = {
  borderWidth: spacing.size01,
  borderRadius: spacing.size08,
  borderColor: appColors.palette.black050,
  backgroundColor: appColors.common.bgWhite,
  shadowColor: appColors.palette.neutral800,
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.05,
  shadowRadius: radius.md,
  elevation: 1,
  marginBottom: spacing.size16,
}

const $colorContainer: ViewStyle = {
  width: responsiveWidth(45),
  height: responsiveHeight(24),
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  padding: spacing.size10,
  borderBottomColor: appColors.palette.black050,
  borderBottomWidth: spacing.size02,
  borderTopRightRadius: spacing.size08,
  borderTopLeftRadius: spacing.size08,
  justifyContent: "space-between",
  alignItems: "center",
}

const $configBlock: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginVertical: spacing.size08,
}

const $titleText: TextStyle = {
  marginBottom: spacing.size04,
  color: appColors.common.characterPrimary,
}

const $tagContainer: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  paddingHorizontal: spacing.size12,
  paddingVertical: spacing.size12,
}

const $editButton: ViewStyle = {
  paddingVertical: spacing.size04,
  paddingLeft: spacing.size12,
  height: responsiveHeight(32),
  borderRadius: radius.lg,
  borderColor: appColors.common.bgRed,
}
