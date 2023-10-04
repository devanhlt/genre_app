import React from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"

import { Button, Typography } from "app/components"
import { Toggle } from "app/components/Toggle"
import { ToggleProps } from "app/components/Toggle/type"
import { Setting } from "app/models/setting/setting"
import { appColors, spacing } from "app/theme"
import { radius } from "app/theme/radius"
import { responsiveHeight, responsiveWidth } from "app/utils/screens"

export interface ConfigLoggingItemProps {
  onHandlePressedButton: (setting: Setting) => void
  setting?: Setting
}

function ControlledToggle(props: ToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return (
    <Toggle
      {...props}
      value={value}
      onPress={() => setValue(!value)}
      containerStyle={$toggleContainer}
    />
  )
}

export default function ConfigLoggingItem({
  onHandlePressedButton,
  setting,
}: ConfigLoggingItemProps): JSX.Element {
  const changeSendEmail = (setting: Setting) => {
    Alert.alert("Confirm", "Are you sure?", [
      {
        text: "Close",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setting.editLoggingSendEmail({ ...setting, sendEmail: !setting.sendEmail })
        },
      },
    ])
  }
  const changeSendSms = (setting: Setting) => {
    Alert.alert("Confirm", "Are you sure?", [
      {
        text: "Close",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setting.editLoggingSendSms({ ...setting, sendSms: !setting.sendSms })
        },
      },
    ])
  }
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
        <Button
          text="Edit"
          preset="secondary"
          style={$editButton}
          onPress={() => {
            onHandlePressedButton(setting)
          }}
        />
      </View>
      <View style={$tagContainer}>
        <View style={$configBlock}>
          <Typography text="Color" preset="body01" style={$titleText} />
          <View style={[$colorContainer, { backgroundColor: setting.color }]} />
        </View>
        <View style={$configBlock}>
          <Typography text="Send Email" preset="body01" style={$titleText} />
          <ControlledToggle
            variant="switch"
            value={setting.sendEmail}
            onValueChange={() => {
              changeSendEmail(setting)
            }}
          />
        </View>
        <View style={$configBlock}>
          <Typography text="Send SMS" preset="body01" style={$titleText} />
          <ControlledToggle
            variant="switch"
            value={setting.sendSms}
            onValueChange={() => {
              changeSendSms(setting)
            }}
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
  shadowOpacity: 0.05,
  shadowRadius: radius.md,
  elevation: 16,
  marginBottom: spacing.size16,
}

const $toggleContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
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
