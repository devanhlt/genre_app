import React, { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button, TextField } from "app/components"
import { System } from "app/models/system/system"
import { spacing } from "app/theme"
import { observer } from "mobx-react-lite"

export interface ConfigSystemModalProps {
  system: System
  onSubmit: (system: System) => void
}
export const ConfigSystemModal = observer(function ConfigSystemModal({
  onSubmit,
  system,
}: ConfigSystemModalProps) {
  const [systemName, setSystemName] = useState<string>(system.systemName)
  const [baseUrl, setBaseUrl] = useState<string>(system.baseUrl)
  const [adminEmail, setAdminEmail] = useState<string>(system.adminEmail)
  const [adminPhone, setAdminPhone] = useState<string>(system.adminPhone)

  const onUpdateSystemConfig = () => {
    // system.onUpdate(systemName, baseUrl, adminEmail, adminPhone)
    onSubmit({ ...system, systemName, baseUrl, adminEmail, adminPhone })
  }

  return (
    <View style={$modalContainer}>
      <KeyboardAwareScrollView>
        <View style={$form}>
          <TextField
            editable={false}
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
        </View>
      </KeyboardAwareScrollView>
      <Button tx="common.save" onPress={onUpdateSystemConfig} style={$saveButton} />
      <SafeAreaView edges={["bottom"]} />
    </View>
  )
})

const $modalContainer: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing.size12,
}

const $form: ViewStyle = {
  gap: spacing.size12,
  flex: 1,
}

const $saveButton: TextStyle = {}
