import React, { useEffect } from "react"
import { View, ViewStyle, useWindowDimensions } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { appColors, spacing } from "app/theme"

import { Typography } from "app/components"
import { ConfigSystemTab } from "./ConfigSystemTab"
import { ConfigLoggingTab } from "./ConfigLoggingTab"

const renderScene = SceneMap({
  system: ConfigSystemTab,
  logging: ConfigLoggingTab,
})

const indicatorContainer: ViewStyle = {
  backgroundColor: appColors.common.bgRed,
  borderBottomColor: appColors.palette.neutral0,
  borderBottomWidth: 1,
}

const renderTabBar = (props) => {
  return (
    <View>
      <TabBar
        {...props}
        style={{ marginBottom: spacing.size12 }}
        indicatorStyle={{ backgroundColor: appColors.palette.neutral0 }}
        indicatorContainerStyle={indicatorContainer}
        renderLabel={({ route }) => (
          <View>
            <Typography style={{ color: appColors.palette.neutral0 }}>{route.title}</Typography>
          </View>
        )}
      />
    </View>
  )
}

export const ConfigTabView = ({ handleOnTab, activeTabIndex }) => {
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(activeTabIndex)

  useEffect(() => {
    setIndex(activeTabIndex)
  }, [activeTabIndex])

  const [routes] = React.useState([
    { key: "system", title: "System" },
    { key: "logging", title: "Logging" },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleOnTab}
      sceneContainerStyle={$scene}
      initialLayout={{ width: layout.width }}
      lazy={false}
    />
  )
}

const $scene: ViewStyle = {
  paddingHorizontal: spacing.size16,
}
