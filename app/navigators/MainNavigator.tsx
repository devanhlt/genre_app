import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { PhosphorIcon } from "app/components/Icon/PhosphorIcon"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { translate } from "../i18n"
import { ConfigurationScreen, DashboardScreen } from "../screens"
import { appColors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { LoggingStack, LoggingStackParamList } from "./LoggingNavigator"

export type MainTabParamList = {
  Dashboard: undefined
  Logging: NavigatorScreenParams<LoggingStackParamList>
  Configuration: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<MainTabParamList>()

export function MainNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: appColors.common.interactivePress,
        tabBarInactiveTintColor: appColors.common.characterPrimary,

        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: translate("mainNavigator.dashboardTab"),
          tabBarIcon: ({ focused, color }) => (
            <PhosphorIcon
              name="HouseSimple"
              color={focused ? appColors.palette.red : color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Logging"
        component={LoggingStack}
        options={{
          tabBarLabel: translate("mainNavigator.loggingTab"),
          tabBarIcon: ({ focused, color }) => (
            <PhosphorIcon
              name="Notepad"
              color={focused ? appColors.palette.red : color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Configuration"
        component={ConfigurationScreen}
        options={{
          tabBarAccessibilityLabel: translate("mainNavigator.configurationTab"),
          tabBarLabel: translate("mainNavigator.configurationTab"),
          tabBarIcon: ({ focused, color }) => (
            <PhosphorIcon
              name="GearSix"
              color={focused ? appColors.palette.red : color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: appColors.common.bgWhite,
  borderTopColor: appColors.common.borderDefault,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.size08,
}

const $tabBarLabel: TextStyle = {
  ...typography.body01,
  fontSize: 12,
  lineHeight: 16,
  flex: 1,
}
