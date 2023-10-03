import { TextStyle, View, ViewStyle } from "react-native"
import React from "react"
import { Button, TextField } from "app/components"
import { spacing } from "app/theme"
import { System } from "app/models/system/system"

export interface ConfigSystemModalProps {
  system: System
}

export const ConfigSystemModal = ({ system }: ConfigSystemModalProps): JSX.Element => {
  return (
    <View style={$form}>
      <TextField
        labelTx="configScreen.systemDetailForm.systemName"
        value={system.systemName}
        clearRightAccessory={false}
      />
      <TextField
        labelTx="configScreen.systemDetailForm.baseURL"
        value={system.baseUrl}
        clearRightAccessory={false}
      />
      <TextField
        labelTx="configScreen.systemDetailForm.adminEmail"
        value={system.adminEmail}
        keyboardType="email-address"
        clearRightAccessory={false}
      />
      <TextField
        labelTx="configScreen.systemDetailForm.adminPhone"
        value={system.adminPhone}
        keyboardType="phone-pad"
        clearRightAccessory={false}
      />
      <View style={$bottomAction}>
        <Button tx="common.save" style={$saveButton} />
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
