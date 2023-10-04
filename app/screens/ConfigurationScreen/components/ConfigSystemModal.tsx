import { TextStyle, View, ViewStyle } from "react-native"
import React, { useState } from "react"
import { Button, TextField } from "app/components"
import { spacing } from "app/theme"
import { System } from "app/models/system/system"

export interface ConfigSystemModalProps {
  system: System
  onSubmit: () => void
}

export const ConfigSystemModal = ({ system, onSubmit }: ConfigSystemModalProps): JSX.Element => {
  const [systemName, setSystemName] = useState<string>(system.systemName)
  const [baseUrl, setBaseUrl] = useState<string>(system.baseUrl)
  const [adminEmail, setAdminEmail] = useState<string>(system.adminEmail)
  const [adminPhone, setAdminPhone] = useState<string>(system.adminPhone)

  const updateSystemConfig = (system: System) => {
    system.editSystemDetail({ ...system, systemName, baseUrl, adminEmail, adminPhone })
    onSubmit()
  }

  return (
    <View style={$form}>
      <TextField
        labelTx="configScreen.systemDetailForm.systemName"
        value={systemName}
        onChangeText={setSystemName}
        clearRightAccessory={false}
      />
      <TextField
        labelTx="configScreen.systemDetailForm.baseURL"
        value={baseUrl}
        onChangeText={setBaseUrl}
        clearRightAccessory={false}
      />
      <TextField
        labelTx="configScreen.systemDetailForm.adminEmail"
        value={adminEmail}
        onChangeText={setAdminEmail}
        keyboardType="email-address"
        clearRightAccessory={false}
      />
      <TextField
        labelTx="configScreen.systemDetailForm.adminPhone"
        value={adminPhone}
        onChangeText={setAdminPhone}
        keyboardType="phone-pad"
        clearRightAccessory={false}
      />
      <View style={$bottomAction}>
        <Button
          tx="common.save"
          style={$saveButton}
          onPress={() => {
            updateSystemConfig(system)
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
