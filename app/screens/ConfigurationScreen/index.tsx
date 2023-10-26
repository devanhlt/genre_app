import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Alert, TouchableOpacity, ViewStyle } from "react-native"

import { Screen } from "app/components"
import { PhosphorIcon } from "app/components/Icon/PhosphorIcon"
import { useStores } from "app/models"
import { MainTabScreenProps } from "app/navigators/MainNavigator"
import { appColors, spacing } from "app/theme"
import { ConfigTabView } from "./components/ConfigTabView"
import { useHeader } from "app/hooks/useHeader"
import { delay } from "app/utils/delay"

interface ConfigurationScreenProps extends MainTabScreenProps<"Configuration"> {}

export const ConfigurationScreen: FC<ConfigurationScreenProps> = observer(
  function ConfigurationScreen(_props) {
    const { authStore, commonStore, settingStore, systemStore } = useStores()
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const handleOnTabPress = (index: number) => setActiveTabIndex(index)

    const handleLogout = () => {
      return Alert.alert("Confirm", "Are you sure?", [
        {
          text: "Close",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            commonStore.setGlobalLoading(true)
            await delay(1000)
            await authStore.logout()
            await authStore.logout()
            await settingStore.reset()
            await systemStore.reset()
            commonStore.setGlobalLoading(false)
          },
        },
      ])
    }

    useHeader({
      leftTx: "mainNavigator.configurationTab",
      backgroundColor: appColors.common.bgRed,
      RightActionComponent: (
        <TouchableOpacity onPress={handleLogout}>
          <PhosphorIcon name="SignOut" color={appColors.common.bgWhite} style={$logoutIcon} />
        </TouchableOpacity>
      ),
    })

    return (
      <Screen preset="fixed" contentContainerStyle={$screenContentContainer}>
        <ConfigTabView handleOnTab={handleOnTabPress} activeTabIndex={activeTabIndex} />
      </Screen>
    )
  },
)

const $screenContentContainer: ViewStyle = {
  paddingVertical: 0,
  flex: 1, // for react-native-tab-view to work
}

const $logoutIcon: ViewStyle = {
  marginRight: spacing.size12,
}
