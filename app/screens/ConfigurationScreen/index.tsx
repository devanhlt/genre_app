import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"

import { Screen, Typography } from "app/components"
import { MainTabScreenProps } from "app/navigators/MainNavigator"
import { spacing } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import { useStores } from "app/models"

interface ConfigurationScreenProps extends MainTabScreenProps<"Configuration"> {}

export const ConfigurationScreen: FC<ConfigurationScreenProps> = observer(
  function ConfigurationScreen(_props) {
    const {
      authStore: { logout },
    } = useStores()

    useHeader({
      rightTx: "common.logOut",
      onRightPress: logout,
    })

    return (
      <Screen
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        <Typography text="ConfigurationScreen" preset="body02" style={$enterDetails} />
      </Screen>
    )
  },
)

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.size48,
  paddingHorizontal: spacing.size24,
}
const $enterDetails: TextStyle = {
  marginBottom: spacing.size24,
}
