import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Share, ViewStyle } from "react-native"
import RNFS from "react-native-fs"

import { Screen } from "app/components"
import { useHeader } from "app/hooks/useHeader"
import { useStores } from "app/models"
import { AppStackScreenProps, goBack } from "app/navigators"
import { appColors, spacing, typography } from "app/theme"

interface AccountDetailScreenProps extends AppStackScreenProps<"LoggingDetail"> {}

export const AccountDetailScreen: FC<AccountDetailScreenProps> = observer(
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

    return <Screen preset="fixed" contentContainerStyle={$screenContentContainer}></Screen>
  },
)

const $screenContentContainer: ViewStyle = {
  paddingBottom: spacing.size48,
  flex: 1,
}
