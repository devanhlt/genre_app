import { FlashList } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"

import { Screen } from "app/components"
import EmptyListMessage from "app/components/EmptyListMessage"
import SearchField from "app/components/InputField/SearchField"
import { useDebounce } from "app/hooks/useDebounce"
import { useHeader } from "app/hooks/useHeader"
import { useSystemsQuery } from "app/hooks/useQueries/useAccountsQuery"
import { useStores } from "app/models"
import { LoggingFilterModel } from "app/models/system/logging"
import { User } from "app/models/users/user"
import { AppStackScreenProps } from "app/navigators"
import { appColors, spacing } from "app/theme"
import { Instance } from "mobx-state-tree"
import UserItem from "./components/UserItem"

interface AccountScreenProps extends AppStackScreenProps<"LoggingDetail"> {}

export const AccountsScreen: FC<AccountScreenProps> = observer(function AccountScreen(_props) {
  const { systemStore } = useStores()
  const [, setIsLoading] = React.useState(false)
  const [searchText, setSearchText] = useState("")

  const { data: users, isLoading } = useSystemsQuery()

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

  async function loadLoggingSystem(currentFilter: Instance<typeof LoggingFilterModel>) {
    setIsLoading(true)
    await systemStore.fetchLoggingSystems(currentFilter)
    setIsLoading(false)
  }

  useEffect(() => {
    loadLoggingSystem({ ...systemStore.getLoggingCurrentFilter, keyword: debouncedSearch })
  }, [debouncedSearch])

  useHeader({
    leftText: "Account",
    backgroundColor: appColors.common.bgRed,
    rightIcon: "export",
    rightIconColor: appColors.palette.neutral0,
    // Export logging by current filter
  })

  // Handle change text search
  const onChangeSearchText = (text: string) => {
    setSearchText(text)
  }

  const onClearSearchText = async () => {
    setSearchText("")
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$screenContentContainer}>
      <View style={$searchContainer}>
        <SearchField
          placeholder="Type any keyword for searching"
          preset="plat"
          value={systemStore.getLoggingCurrentFilter.keyword}
          containerStyle={$searchInput}
          onChangeText={onChangeSearchText}
          onClear={onClearSearchText}
        />
      </View>
      <FlashList<User>
        centerContent
        contentContainerStyle={$flatListContentContainer}
        data={users}
        extraData={systemStore.lstSystemLogging.length}
        renderItem={({ item }) => <UserItem item={item} />}
        estimatedItemSize={69}
        ListEmptyComponent={() => <EmptyListMessage isLoading={isLoading} />}
        keyExtractor={(item, index) => `user-item-${item.userName}--${index}`}
        getItemType={(item) => {
          return item.userName
        }}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   !isLstEmpty && (
        //     <RefreshControl
        //       title={"Thả để cập nhật"}
        //       refreshing={refreshing}
        //       onRefresh={manualRefresh}
        //     />
        //   )
        // }
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $searchContainer: ViewStyle = {
  flexDirection: "row",
  paddingBottom: spacing.size16,
  paddingTop: spacing.size08,
  paddingHorizontal: spacing.size16,
  backgroundColor: appColors.common.bgRed,
  justifyContent: "center",
  alignItems: "center",
}

const $searchInput: ViewStyle = { flex: 1 }

const $flatListContentContainer: ViewStyle = {
  paddingBottom: spacing.size16,
}
