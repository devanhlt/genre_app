import { useStores } from "app/models"
import React, { useEffect } from "react"
import { FlatList } from "react-native"
import ConfigSystemItem from "./ConfigSystemItem"

export const ConfigSystemTab = () => {
  const { systemStore } = useStores()
  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      await systemStore.fetchSystems()
    })()
  }, [systemStore])

  return (
    <FlatList
      data={systemStore.systems}
      keyExtractor={(item, index) =>
        `system-tab-${item.totalLogInfo}-${item.totalLogWarn}-${item.totalLogError}-${index}`
      }
      extraData={systemStore.systems.length}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<></>}
      renderItem={({ item }) => <ConfigSystemItem system={item} />}
    />
  )
}
