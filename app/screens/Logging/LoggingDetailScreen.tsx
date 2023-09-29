import React, { FC } from "react"
import { FlatList, TextStyle, ViewStyle } from "react-native"

import { Screen } from "app/components"
import { AppStackScreenProps, goBack } from "app/navigators"
import { appColors, boldType, spacing, typography } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import LoggingDetailItem from "./components/LoggingDetailItem"

interface LoggingDetailScreenProps extends AppStackScreenProps<"LoggingDetail"> {}

export const LoggingDetailScreen: FC<LoggingDetailScreenProps> = function LoggingScreen({ route }) {
  const { params } = route

  const { logging = null } = params

  useHeader({
    title: "Log Detail",
    titleStyle: { ...typography.headline02, color: appColors.palette.neutral0 },
    backgroundColor: appColors.common.bgRed,
    leftIcon: "back",
    leftIconColor: appColors.palette.neutral0,
    onLeftPress: goBack,
  })

  const data = Object.keys(logging)

  const parseValueToString = (value: any) => {
    if (typeof value === "object") {
      return JSON.stringify(value) || ""
    }

    return value
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$screenContentContainer}>
      <FlatList
        data={data}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <LoggingDetailItem field="Field" value="Value" descriptionStyle={$textBold} />
        )}
        renderItem={({ index, item }) => (
          <LoggingDetailItem
            key={index}
            field={item}
            value={`${parseValueToString(logging?.[item])}`}
          />
        )}
      />
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.size48,
}

const $textBold: TextStyle = {
  ...boldType,
}
