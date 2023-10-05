import React, { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button, TextField } from "app/components"
import { spacing } from "app/theme"
import { Setting } from "app/models/setting/setting"
import { observer } from "mobx-react-lite"

export interface ConfigLoggingModalProps {
  setting: Setting
  onSubmit: (setting: Setting) => void
}

export const ConfigLoggingModal = observer(
  ({ setting, onSubmit }: ConfigLoggingModalProps): JSX.Element => {
    const [color, setColor] = useState<string>(setting.color)
    const [description, setDescription] = useState<string>(setting.description)

    const updateLoggingConfig = () => {
      onSubmit({ ...setting, color, description })
    }

    return (
      <View style={$modalContainer}>
        <KeyboardAwareScrollView>
          <View style={$form}>
            <TextField
              labelTx="configScreen.loggingDetailForm.logLevel"
              value={`${setting.logLevel}`}
              // onChangeText={setLogLevel}
              clearRightAccessory={false}
              editable={false}
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
          </View>
        </KeyboardAwareScrollView>
        <Button tx="common.save" onPress={updateLoggingConfig} style={$saveButton} />
        <SafeAreaView edges={["bottom"]} />
      </View>
    )
  },
)

const $modalContainer: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing.size12,
}

const $form: ViewStyle = {
  marginHorizontal: spacing.size12,
  flexDirection: "column",
  gap: spacing.size12,
}

const $saveButton: TextStyle = {}
