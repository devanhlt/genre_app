import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { FlatList, ViewStyle } from "react-native"

import { Screen } from "app/components"
import { MainTabScreenProps } from "app/navigators/MainNavigator"
import { appColors, spacing, typography } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import DashboardSystemItem from "./components/DashboardSystemItem"
import { useStores } from "app/models"
import { delay } from "app/utils/delay"
import { Loading } from "app/components/Loading"
import { System } from "app/models/system/system"

interface DashboardScreenProps extends MainTabScreenProps<"DashboardScreen"> {}

export const DashboardScreen: FC<DashboardScreenProps> = observer(function DashboardScreen(_props) {
  const { systemStore } = useStores()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await systemStore.fetchSystems()
      setIsLoading(false)
    })()
  }, [systemStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([systemStore.fetchSystems(), delay(750)])
    setRefreshing(false)
  }

  useHeader({
    title: "Dashboard",
    titleStyle: { ...typography.headline02, color: appColors.palette.neutral0 },
    backgroundColor: appColors.common.bgRed,
  })

  console.log("systemStore:", systemStore)

  return (
    <Screen preset="auto" contentContainerStyle={$screenContentContainer}>
      <FlatList<System>
        data={systemStore.systemsForList}
        extraData={systemStore.systems.length}
        refreshing={refreshing}
        contentContainerStyle={$flatListContentContainer}
        onRefresh={manualRefresh}
        ListEmptyComponent={isLoading ? <Loading inline /> : <></>}
        ListHeaderComponent={<></>}
        renderItem={({ item }) => <DashboardSystemItem key={item.guid} />}
      />
      <DashboardSystemItem />
      <DashboardSystemItem />
      <DashboardSystemItem />
      <DashboardSystemItem />
      <DashboardSystemItem />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.size16,
  paddingHorizontal: spacing.size16,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.size08,
  paddingTop: spacing.size16,
  paddingBottom: spacing.size16,
}
