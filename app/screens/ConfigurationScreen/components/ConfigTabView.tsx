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

const renderTabBar = (props) => {
  return (
    <View>
      <TabBar
        {...props}
        style={$tabBarStyle}
        indicatorStyle={$tabBarIndicatorStyle}
        indicatorContainerStyle={$indicatorContainer}
        renderLabel={({ route }) => (
          <View>
            <Typography preset="body03" color={appColors.palette.neutral0} text={route.title} />
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
      sceneContainerStyle={$sceneContainerStyle}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleOnTab}
      initialLayout={{ width: layout.width }}
      lazy={false}
    />
  )
}

const $sceneContainerStyle: ViewStyle = {
  paddingHorizontal: spacing.size16,
}

const $tabBarStyle: ViewStyle = {
  marginBottom: spacing.size12,
}
const $tabBarIndicatorStyle: ViewStyle = {
  backgroundColor: appColors.palette.neutral0,
}

const $indicatorContainer: ViewStyle = {
  backgroundColor: appColors.common.bgRed,
  borderBottomColor: appColors.palette.neutral0,
  borderBottomWidth: 1,
}
