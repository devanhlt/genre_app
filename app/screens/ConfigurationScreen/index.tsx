import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ViewStyle } from "react-native"

import { appColors, spacing, typography } from "app/theme"
import { Screen } from "app/components"
import { MainTabScreenProps } from "app/navigators/MainNavigator"
import { useHeader } from "app/utils/useHeader"
import { useStores } from "app/models"
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
      rightTx: "common.logOut",
      rightTextStyle: { ...typography.body02, paddingRight: spacing.size10 },
      onRightPress: logout,
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
