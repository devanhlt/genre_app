import { useStores } from "app/models"
import React, { Fragment, useEffect, useRef, useState } from "react"
import { FlatList } from "react-native"
import ConfigLoggingItem from "./ConfigLoggingItem"
import { BottomModal } from "app/components"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { ConfigLoggingModal } from "./ConfigLoggingModal"
import { Setting } from "app/models/setting/setting"
import { observer } from "mobx-react-lite"

export const ConfigLoggingTab = observer(function ConfigLoggingTab() {
  const { settingStore } = useStores()
  const [currSetting, setCurrSetting] = useState<Setting>()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      await settingStore.fetchSettings()
    })()
  }, [settingStore])

  const handlePressedButton = (setting: Setting) => {
    setCurrSetting(setting)
    bottomSheetModalRef.current.present()
  }

  const handleSubmit = () => {
    bottomSheetModalRef.current.dismiss()
  }

  return (
    <Fragment>
      <FlatList
        data={settingStore.getCurrentSettings}
        extraData={settingStore.settings.length}
        keyExtractor={(item, index) => `system-tab-${item.logLevel}-${index}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<></>}
        renderItem={({ item }) => (
          <ConfigLoggingItem setting={item} onHandlePressedButton={handlePressedButton} />
        )}
      />
      <BottomModal
        ref={bottomSheetModalRef}
        title="Edit Logging Configuration"
        snapPoints={["50%"]}
      >
        <ConfigLoggingModal setting={currSetting} onSubmit={handleSubmit} />
      </BottomModal>
    </Fragment>
  )
})
