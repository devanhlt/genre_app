import { useStores } from "app/models"
import React, { useEffect } from "react"
import { FlatList } from "react-native"
import ConfigLoggingItem from "./ConfigLoggingItem"

export const ConfigLoggingTab = (): JSX.Element => {
  const { settingStore } = useStores()
  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      await settingStore.fetchSettings()
    })()
  }, [settingStore])

  return (
    <FlatList
      data={settingStore.getCurrentSettings}
      extraData={settingStore.settings.length}
      keyExtractor={(item, index) => `system-tab-${item.logLevel}-${index}`}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<></>}
      renderItem={({ item }) => <ConfigLoggingItem setting={item} />}
    />
  )
}
