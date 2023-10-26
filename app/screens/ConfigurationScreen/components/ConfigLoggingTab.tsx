import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { observer } from "mobx-react-lite"
import React, { Fragment, useEffect, useRef, useState } from "react"
import { FlatList, RefreshControl } from "react-native"

import { BottomModal } from "app/components"
import { useStores } from "app/models"
import { Setting } from "app/models/setting/setting"
import { delay } from "app/utils/delay"
import ConfigLoggingItem from "./ConfigLoggingItem"
import { ConfigLoggingModal } from "./ConfigLoggingModal"
import EmptyListMessage from "app/components/EmptyListMessage"

export const ConfigLoggingTab = observer(function ConfigLoggingTab() {
  const { settingStore, commonStore } = useStores()
  const [currSetting, setCurrSetting] = useState<Setting>()
  const [refreshing, setRefreshing] = React.useState(false)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      await settingStore.fetchSettings()
    })()
  }, [settingStore])

  const onEditLogSetting = (setting: Setting) => {
    setCurrSetting(setting)
    bottomSheetModalRef.current.present()
  }

  const onUpdateLogConfig = async (setting: Setting) => {
    commonStore.setGlobalLoading(true)
    const response = await settingStore.updateLoggingSetting(setting)
    if (response) {
      bottomSheetModalRef?.current?.dismiss()
      const currentLogConfig = settingStore.getCurrentSettings.find(
        (s) => s.logLevel === setting.logLevel,
      )
      currentLogConfig?.onUpdate(setting)
      // TODO success message
    } else {
      // TODO error message
    }
    await delay(500)
    commonStore.setGlobalLoading(false)
  }

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([settingStore.fetchSettings(), delay(750)])
    setRefreshing(false)
  }

  return (
    <Fragment>
      <FlatList
        data={settingStore.getCurrentSettings}
        extraData={settingStore.settings.length}
        keyExtractor={(item, index) => `config-system-tab-${item.logLevel}-${index}`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          settingStore.getCurrentSettings.length && (
            <RefreshControl
              title={"Thả để cập nhật"}
              refreshing={refreshing}
              onRefresh={manualRefresh}
            />
          )
        }
        ListEmptyComponent={() => <EmptyListMessage />}
        renderItem={({ item }) => (
          <ConfigLoggingItem
            setting={item}
            onEdit={onEditLogSetting}
            onUpdate={onUpdateLogConfig}
          />
        )}
      />
      <BottomModal
        ref={bottomSheetModalRef}
        title="Edit Logging Configuration"
        snapPoints={["60%"]}
      >
        <ConfigLoggingModal setting={currSetting} onSubmit={onUpdateLogConfig} />
      </BottomModal>
    </Fragment>
  )
})
