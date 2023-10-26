import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { observer } from "mobx-react-lite"
import React, { Fragment, useEffect, useRef, useState } from "react"
import { FlatList, RefreshControl } from "react-native"

import { BottomModal } from "app/components"
import EmptyListMessage from "app/components/EmptyListMessage"
import { useStores } from "app/models"
import { System } from "app/models/system/system"
import { delay } from "app/utils/delay"
import ConfigSystemItem from "./ConfigSystemItem"
import { ConfigSystemModal } from "./ConfigSystemModal"

export const ConfigSystemTab = observer(function ConfigSystemTab() {
  const { systemStore, commonStore } = useStores()
  const [selectedSystem, setSelectedSystem] = useState<System>()
  const [refreshing, setRefreshing] = React.useState(false)

  // Component refs
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      await systemStore.fetchSystems()
    })()
  }, [systemStore])

  const onEditSystem = (system: System) => {
    setSelectedSystem(system)
    bottomSheetModalRef.current.present()
  }

  const onUpdateSystem = async (system: System) => {
    commonStore.setGlobalLoading(true)
    const response = await systemStore.updateSystemConfig(system)
    if (response) {
      bottomSheetModalRef?.current?.dismiss()
      const currentSystem = systemStore.systemsForList.find(
        (s) => s.systemName === system.systemName,
      )
      currentSystem?.onUpdate(system)
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
    await Promise.all([systemStore.fetchSystems(), delay(750)])
    setRefreshing(false)
  }

  return (
    <Fragment>
      <FlatList
        data={systemStore.systems}
        keyExtractor={(item, index) =>
          `config-system-tab-${item.totalLogInfo}-${item.totalLogWarn}-${item.totalLogError}-${index}`
        }
        extraData={systemStore.systems.length}
        showsVerticalScrollIndicator={false}
        refreshControl={
          !systemStore.isEmptySystem && (
            <RefreshControl
              title={"Thả để cập nhật"}
              refreshing={refreshing}
              onRefresh={manualRefresh}
            />
          )
        }
        ListEmptyComponent={() => <EmptyListMessage isLoading={systemStore.isLoadingSystem} />}
        renderItem={({ item }) => (
          <ConfigSystemItem system={item} onEdit={onEditSystem} onUpdate={onUpdateSystem} />
        )}
      />
      <BottomModal ref={bottomSheetModalRef} title="Edit System Configuration" snapPoints={["70%"]}>
        <ConfigSystemModal system={selectedSystem} onSubmit={onUpdateSystem} />
      </BottomModal>
    </Fragment>
  )
})
