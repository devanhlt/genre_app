import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { FC, useEffect, useRef, useState } from "react"
import { RefreshControl, Share, TouchableOpacity, View, ViewStyle } from "react-native"
import { FlashList } from "@shopify/flash-list"

import { BottomModal, Screen } from "app/components"
import { PhosphorIcon } from "app/components/Icon/PhosphorIcon"
import SearchField from "app/components/InputField/SearchField"
import { useStores } from "app/models"
import { Logging, LoggingFilterModel } from "app/models/system/logging"
import { AppStackScreenProps } from "app/navigators"
import { appColors, spacing } from "app/theme"
import { delay } from "app/utils/delay"
import { Instance } from "mobx-state-tree"
import { LoggingFilter } from "./components/LoggingFilter"
import LoggingItem from "./components/LoggingItem"

import EmptyListMessage from "app/components/EmptyListMessage"
import { useDebounce } from "app/hooks/useDebounce"
import { useHeader } from "app/hooks/useHeader"
import { jsonToString } from "app/utils/helpers"
import { endOfDay, startOfDay, subDays } from "date-fns"
import { observer } from "mobx-react-lite"
import RNFS from "react-native-fs"


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

export const LoggingScreen: FC<LoggingScreenProps> = observer(function LoggingScreen(props) {
  const { navigation } = props

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const { systemStore } = useStores()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchText, setSearchText] = useState("")
  const [fromDate, setFromDate] = useState(startOfDay(subDays(new Date(), 1)))
  const [toDate, setToDate] = useState(endOfDay(new Date()))

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

  const onExportByFilter = async () => {
    const loggings = await systemStore.exportLogByFilter({
      ...systemStore.getLoggingCurrentFilter,
      keyword: debouncedSearch,
    })

    // TODO move logic code to common file
    // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
    // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
    const now = new Date().getTime()
    const path = `${RNFS.DocumentDirectoryPath}/${now.toString()}.log`

    RNFS.writeFile(path, jsonToString(loggings), "utf8")
      .then(async () => {
        const result = await Share.share({
          title: "API Management Logs",
          url: path,
        })
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useHeader({
    leftTx: "screenTitle.loggingTab",
    backgroundColor: appColors.common.bgRed,
    rightIcon: "export",
    rightIconColor: appColors.palette.neutral0,
    // Export logging by current filter
    onRightPress: onExportByFilter,
  })

  // Navigate logging detail
  const onPressLoggingItem = (item: Logging) => {
    navigation.navigate("LoggingDetail", { logging: item })
  }

  // Handle change text search
  const onChangeSearchText = (text: string) => {
    setSearchText(text)
  }

  const onClearSearchText = async () => {
    setSearchText("")
    await loadLoggingSystem({
      ...systemStore.getLoggingCurrentFilter,
      fromDate: startOfDay(fromDate),
      toDate: endOfDay(toDate),
    })
  }

  // Apply filter
  const onApplyFilter = async (loggingFilter: Instance<typeof LoggingFilterModel>) => {
    bottomSheetModalRef.current?.close()
    systemStore.onChangeLoggingFilter({ ...loggingFilter })
    setFromDate(loggingFilter.fromDate)
    setToDate(loggingFilter.toDate)
    await loadLoggingSystem({
      ...loggingFilter,
      fromDate: startOfDay(fromDate),
      toDate: endOfDay(toDate),
    })
  }

  // Reset filter
  const onResetFilter = async () => {
    bottomSheetModalRef.current?.close()
    systemStore.onResetFilter()
    setSearchText("")
    await loadLoggingSystem({
      ...systemStore.getLoggingCurrentFilter,
      fromDate: startOfDay(fromDate),
      toDate: endOfDay(toDate),
    })
  }

  // Open filter
  const onOpenFilter = async () => {
    bottomSheetModalRef?.current?.present?.()
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
        <TouchableOpacity onPress={onOpenFilter}>
          <PhosphorIcon name="Funnel" style={$searchFilter} color={appColors.common.bgWhite} />
        </TouchableOpacity>
      </View>

      <FlashList<Logging>
        centerContent
        contentContainerStyle={$flatListContentContainer}
        data={systemStore.lstSystemLogging}
        extraData={systemStore.lstSystemLogging.length}
        renderItem={({ item }) => <LoggingItem item={item} onPressItem={onPressLoggingItem} />}
        estimatedItemSize={200}
        ListEmptyComponent={() => <EmptyListMessage isLoading={isLoading} />}
        keyExtractor={(item, index) => `logging-item-${item.idStr}--${index}`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          !isLstEmpty && (
            <RefreshControl
              title={"Thả để cập nhật"}
              refreshing={refreshing}
              onRefresh={manualRefresh}
            />
          )
        }
      />
      <BottomModal ref={bottomSheetModalRef} title="Filter" snapPoints={["75%"]}>
        <LoggingFilter
          onApplyFilter={onApplyFilter}
          onResetFilter={onResetFilter}
          fromDate={fromDate}
          toDate={toDate}
        />
      </BottomModal>
    </Screen>
  )
})

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

const $flatListContentContainer: ViewStyle = {
  paddingTop: spacing.size16,
  paddingBottom: spacing.size16,
}
