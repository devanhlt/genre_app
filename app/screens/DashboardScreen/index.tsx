import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { FlatList, RefreshControl, ViewStyle } from "react-native"

import { Screen } from "app/components"
import { useStores } from "app/models"
import { System } from "app/models/system/system"
import { MainTabScreenProps } from "app/navigators/MainNavigator"
import { appColors, spacing } from "app/theme"
import { delay } from "app/utils/delay"
import { useHeader } from "app/hooks/useHeader"
import DashboardSystemItem from "./components/DashboardSystemItem"
import EmptyListMessage from "app/components/EmptyListMessage"

interface DashboardScreenProps extends MainTabScreenProps<"Dashboard"> {}

export const DashboardScreen: FC<DashboardScreenProps> = observer(function DashboardScreen(_props) {
  const { systemStore, commonStore } = useStores()
  const [refreshing, setRefreshing] = React.useState(false)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      commonStore.setGlobalLoading(false)
      await systemStore.fetchSystems()
    })()
  }, [systemStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([systemStore.fetchSystems(), delay(750)])
    setRefreshing(false)
  }

  useHeader({
    leftText: "Dashboard",
    backgroundColor: appColors.common.bgRed,
  })

  return (
    <Screen preset="fixed" contentContainerStyle={$screenContentContainer}>
      <FlatList<System>
        data={systemStore.systemsForList}
        centerContent
        keyExtractor={(item, index) =>
          `system-${item.totalLogInfo}-${item.totalLogWarn}-${item.totalLogError}-${index}`
        }
        extraData={systemStore.systems.length}
        refreshControl={
          !systemStore.isEmptySystem && (
            <RefreshControl
              title={"Thả để cập nhật"}
              refreshing={refreshing}
              onRefresh={manualRefresh}
            />
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={$flatListContentContainer}
        ListHeaderComponent={<></>}
        ListEmptyComponent={() => <EmptyListMessage isLoading={systemStore.isLoadingSystem} />}
        renderItem={({ item }) => <DashboardSystemItem item={item} />}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingHorizontal: spacing.size08,
  flex: 1,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.size08,
  paddingTop: spacing.size16,
  paddingBottom: spacing.size16,
}
