import { useStores } from "app/models"
import React, { Fragment, useEffect, useRef, useState } from "react"
import { FlatList } from "react-native"
import ConfigSystemItem from "./ConfigSystemItem"
import { BottomModal } from "app/components"
import { ConfigSystemModal } from "./ConfigSystemModal"
import { System } from "app/models/system/system"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

export const ConfigSystemTab = () => {
  const { systemStore } = useStores()
  const [system, setSystem] = useState<System>()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      await systemStore.fetchSystems()
    })()
  }, [systemStore])

  const handlePressedButton = (system: System) => {
    setSystem(system)
    bottomSheetModalRef.current.present()
  }

  return (
    <Fragment>
      <FlatList
        data={systemStore.systems}
        keyExtractor={(item, index) =>
          `system-tab-${item.totalLogInfo}-${item.totalLogWarn}-${item.totalLogError}-${index}`
        }
        extraData={systemStore.systems.length}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<></>}
        renderItem={({ item }) => (
          <ConfigSystemItem system={item} onHandlePressedButton={handlePressedButton} />
        )}
      />
      <BottomModal ref={bottomSheetModalRef} title="Details" snapPoints={["60%"]}>
        <ConfigSystemModal system={system} />
      </BottomModal>
    </Fragment>
  )
}
