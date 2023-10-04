import { TextStyle, View, ViewStyle } from "react-native"
import React, { useState } from "react"
import { Button, TextField } from "app/components"
import { spacing } from "app/theme"
import { Setting } from "app/models/setting/setting"

export interface ConfigLoggingModalProps {
  setting: Setting
  onSubmit: () => void
}

export const ConfigLoggingModal = ({ setting, onSubmit }: ConfigLoggingModalProps): JSX.Element => {
  const [logLevel, setLogLevel] = useState<string>(setting.logLevel.toString())
  const [color, setColor] = useState<string>(setting.color)
  const [description, setDescription] = useState<string>(setting.description)

  const updateLoggingConfig = (setting: Setting) => {
    setting?.editLoggingDetail({ ...setting, logLevel: parseInt(logLevel), color, description })
    onSubmit()
  }

  return (
    <View style={$form}>
      <TextField
        labelTx="configScreen.loggingDetailForm.logLevel"
        value={logLevel}
        onChangeText={setLogLevel}
        clearRightAccessory={false}
      />
      <TextField
        labelTx="configScreen.loggingDetailForm.color"
        value={color}
        onChangeText={setColor}
        clearRightAccessory={false}
      />
      <TextField
        labelTx="configScreen.loggingDetailForm.description"
        value={description}
        onChangeText={setDescription}
        clearRightAccessory={false}
      />
      <View style={$bottomAction}>
        <Button
          tx="common.save"
          style={$saveButton}
          onPress={() => {
            updateLoggingConfig(setting)
          }}
        />
      </View>
    </View>
  )
}

const $form: ViewStyle = {
  marginHorizontal: spacing.size12,
  flexDirection: "column",
  gap: spacing.size12,
}

const $bottomAction: TextStyle = {
  flexDirection: "row",
}

const $saveButton: TextStyle = {
  marginTop: spacing.size24,
  flex: 1,
}
