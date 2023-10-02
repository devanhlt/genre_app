import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { FC, useEffect, useRef, useState } from "react"
import { FlatList, TouchableOpacity, View, ViewStyle } from "react-native"

import { BottomModal, Screen, Typography } from "app/components"
import { PhosphorIcon } from "app/components/Icon/PhosphorIcon"
import SearchField from "app/components/InputField/SearchField"
import { Loading } from "app/components/Loading"
import { useStores } from "app/models"
import { LoggingFilterModel } from "app/models/system"
import { Logging } from "app/models/system/logging"
import { AppStackScreenProps } from "app/navigators"
import { appColors, spacing } from "app/theme"
import { delay } from "app/utils/delay"
import { useDebounce } from "app/utils/useDebounce"
import { useHeader } from "app/utils/useHeader"
import { Instance } from "mobx-state-tree"
import { LoggingFilter } from "./components/LoggingFilter"
import LoggingItem from "./components/LoggingItem"

interface LoggingScreenProps extends AppStackScreenProps<"LoggingDetail"> {}

export const LoggingFilterTypes = [
  { id: "", displayName: "ALL" },
  { id: "INFO", displayName: "INFO" },
  { id: "WARN", displayName: "WARN" },
  { id: "ERROR", displayName: "ERROR" },
]

export const LoggingFilterStatus = [
  { id: "", displayName: "ALL" },
  { id: "RESOLVED", displayName: "RESOLVED" },
]

export const LoggingScreen: FC<LoggingScreenProps> = function LoggingScreen(props) {
  const { navigation } = props

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const { systemStore } = useStores()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchText, setSearchText] = useState("")

  const debouncedSearch = useDebounce(searchText, 1000)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await systemStore.fetchLoggingSystems({
        ...systemStore.getLoggingCurrentFilter,
        keyword: searchText,
      })
      setIsLoading(false)
    })()
  }, [systemStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    if (!isLoading) {
      setRefreshing(true)
      await Promise.all([
        systemStore.fetchLoggingSystems({
          ...systemStore.getLoggingCurrentFilter,
          keyword: searchText,
        }),
        delay(750),
      ])
      setRefreshing(false)
    }
  }

  async function loadLoggingSystem(currentFilter: Instance<typeof LoggingFilterModel>) {
    setIsLoading(true)
    await systemStore.fetchLoggingSystems(currentFilter)
    setIsLoading(false)
  }

  useEffect(() => {
    loadLoggingSystem({ ...systemStore.getLoggingCurrentFilter, keyword: debouncedSearch })
  }, [debouncedSearch])

  useHeader({
    leftTx: "screenTitle.loggingTab",
    backgroundColor: appColors.common.bgRed,
    rightIcon: "export",
    rightIconColor: appColors.palette.neutral0,
    onRightPress: () => null,
  })

  const onPressLoggingItem = (item: Logging) => {
    navigation.navigate("LoggingDetail", { logging: item })
  }

  const onChangeSearchText = (text: string) => {
    setSearchText(text)
  }

  const onClearSearchText = async () => {
    setSearchText("")
    await loadLoggingSystem(systemStore.getLoggingCurrentFilter)
  }

  const onApplyFilter = async (loggingFilter: Instance<typeof LoggingFilterModel>) => {
    bottomSheetModalRef.current?.close()
    systemStore.onChangeLoggingFilter({ ...loggingFilter })
    await loadLoggingSystem(loggingFilter)
  }

  const onResetFilter = async () => {
    bottomSheetModalRef.current?.close()
    systemStore.onResetFilter()
    setSearchText("")
    await loadLoggingSystem(systemStore.getLoggingCurrentFilter)
  }

  const isLstEmpty =
    !systemStore.lstSystemLogging.length || !systemStore.systemsLoggingForList.length

  return (
    <Screen preset="fixed" contentContainerStyle={$screenContentContainer}>
      <View style={$filterContainer}>
        <SearchField
          placeholder="Type any keyword for searching"
          preset="plat"
          value={systemStore.getLoggingCurrentFilter.keyword}
          containerStyle={$searchInput}
          onChangeText={onChangeSearchText}
          onClear={onClearSearchText}
        />
        <TouchableOpacity onPress={() => bottomSheetModalRef.current?.present()}>
          <PhosphorIcon name="Funnel" style={$searchFilter} color={appColors.common.bgWhite} />
        </TouchableOpacity>
      </View>
      {isLstEmpty && !isLoading && (
        <View style={$listEmptyContainer}>
          <Typography text="No data!" />
        </View>
      )}
      {isLoading && <Loading />}
      {!isLstEmpty && !isLoading && (
        <FlatList
          data={systemStore.lstSystemLogging}
          extraData={systemStore.lstSystemLogging.length}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          showsVerticalScrollIndicator={false}
          renderItem={({ index, item }) => (
            <LoggingItem
              key={`logging-item-${index}`}
              item={item}
              onPressItem={onPressLoggingItem}
            />
          )}
        />
      )}
      <BottomModal ref={bottomSheetModalRef} title="Filter" snapPoints={["75%"]}>
        <LoggingFilter onApplyFilter={onApplyFilter} onResetFilter={onResetFilter} />
      </BottomModal>
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $filterContainer: ViewStyle = {
  flexDirection: "row",
  paddingBottom: spacing.size16,
  paddingTop: spacing.size08,
  paddingHorizontal: spacing.size16,
  backgroundColor: appColors.common.bgRed,
  justifyContent: "center",
  alignItems: "center",
}

const $searchInput: ViewStyle = { flex: 1 }

const $searchFilter: ViewStyle = {
  marginLeft: spacing.size16,
}

const $listEmptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
