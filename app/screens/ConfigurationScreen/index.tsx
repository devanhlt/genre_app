import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { TouchableOpacity, ViewStyle } from "react-native"

import { Screen } from "app/components"
import { PhosphorIcon } from "app/components/Icon/PhosphorIcon"
import { useStores } from "app/models"
import { MainTabScreenProps } from "app/navigators/MainNavigator"
import { appColors, spacing } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import { ConfigTabView } from "./components/ConfigTabView"

interface ConfigurationScreenProps extends MainTabScreenProps<"Configuration"> {}

export const ConfigurationScreen: FC<ConfigurationScreenProps> = observer(
  function ConfigurationScreen(_props) {
    const {
      authStore: { logout },
    } = useStores()
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const handleOnTabPress = (index: number) => setActiveTabIndex(index)

    useHeader({
      leftTx: "mainNavigator.configurationTab",
      backgroundColor: appColors.common.bgRed,
      RightActionComponent: (
        <TouchableOpacity onPress={logout}>
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
