import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FlatList, Share, TextStyle, ViewStyle } from "react-native"
import RNFS from "react-native-fs"

import { Screen } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps, goBack } from "app/navigators"
import { appColors, boldType, spacing, typography } from "app/theme"
import { jsonToString } from "app/utils/helpers"
import { useHeader } from "app/hooks/useHeader"
import LoggingDetailItem from "./components/LoggingDetailItem"

interface LoggingDetailScreenProps extends AppStackScreenProps<"LoggingDetail"> {}

export const LoggingDetailScreen: FC<LoggingDetailScreenProps> = observer(
  function LoggingDetailScreen({ route }) {
    const { params } = route

    const { systemStore } = useStores()

    const { logging = null } = params

    const onExportByFilter = async () => {
      const log = await systemStore.exportSingleLogDetail(logging)
      if (!log) return
      const path = `${RNFS.DocumentDirectoryPath}/${logging.systemName}-${logging.idStr}.log`
      RNFS.writeFile(path, log, "utf8")
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
      title: "Log Detail",
      titleStyle: { ...typography.headline02, color: appColors.palette.neutral0 },
      backgroundColor: appColors.common.bgRed,
      leftIcon: "back",
      leftIconColor: appColors.palette.neutral0,
      rightIcon: "export",
      rightIconColor: appColors.palette.neutral0,
      onLeftPress: goBack,
      onRightPress: onExportByFilter,
    })

    const data = Object.keys(logging)

    const parseValueToString = (value: any) => {
      if (typeof value === "object") {
        return jsonToString(value) || ""
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
  },
)

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.size48,
}

const $textBold: TextStyle = {
  ...boldType,
}
