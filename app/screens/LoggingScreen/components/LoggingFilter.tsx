import React, { FC, useState } from "react"
import { FlatList, ScrollView, TextStyle, View, ViewStyle } from "react-native"

import { Button, Typography } from "app/components"
import { appColors, spacing } from "app/theme"
import { SafeAreaView } from "react-native-safe-area-context"
import { observer } from "mobx-react-lite"
import { useStores } from "app/models"
import { TouchableOpacity } from "@gorhom/bottom-sheet"
import { radius } from "app/theme/radius"
import Tag from "app/components/Tag"
import { LoggingFilterStatus, LoggingFilterTypes } from "../LoggingScreen"
import { Instance } from "mobx-state-tree"
import { LoggingFilterModel } from "app/models/system"
import DatePickerField from "app/components/InputField/DatePickerField"
import { Divider } from "app/components/Divider"

export interface LoggingFilterProps {
  onApplyFilter: (filter?: Instance<typeof LoggingFilterModel>) => void
  onResetFilter: () => void
}

export const LoggingFilter: FC<LoggingFilterProps> = observer(function LoggingFilter({
  onApplyFilter = () => null,
  onResetFilter = () => null,
}) {
  const { systemStore } = useStores()

  const [loggingFilter, setLoggingFilter] = useState<Instance<typeof LoggingFilterModel>>(
    systemStore.getLoggingCurrentFilter,
  )

  const onChangeLogSystem = (systemId: string) => () => {
    setLoggingFilter({ ...loggingFilter, system: systemId })
  }

  const onChangeLogType = (logTypeId: string) => () => {
    setLoggingFilter({ ...loggingFilter, logType: logTypeId })
  }

  const onChangeLogStatus = (statusId: string) => () => {
    setLoggingFilter({ ...loggingFilter, status: statusId })
  }

  const onChangeFromDate = (date: Date) => {
    setLoggingFilter({ ...loggingFilter, fromDate: date })
  }

  const onChangeToDate = (date: Date) => {
    setLoggingFilter({ ...loggingFilter, toDate: date })
  }

  const handleOnApplyFilter = () => {
    onApplyFilter(loggingFilter)
  }

  const handleOnResetFilter = () => {
    onResetFilter()
  }

  const currentSystem = loggingFilter?.system
  const currentLogType = loggingFilter?.logType
  const currentStatus = loggingFilter?.status

  return (
    <View style={$viewContainer}>
      <ScrollView style={$contentContainer}>
        {/* System  */}
        <View style={$filterItem}>
          <Typography preset="label01" text={"System"} style={$labelStyle} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={systemStore.systemsForList}
            extraData={systemStore.systems.length}
            keyExtractor={(item, index) =>
              `system-filter-${item.totalLogInfo}-${item.totalLogWarn}-${item.totalLogError}-${index}`
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={onChangeLogSystem(item.systemName)}
                style={[
                  $systemItem,
                  {
                    backgroundColor:
                      currentSystem === item.systemName
                        ? appColors.common.bgRed
                        : appColors.palette.neutral200,
                  },
                ]}
              >
                <Tag
                  label={item.systemName}
                  color={
                    currentSystem === item.systemName
                      ? appColors.palette.neutral0
                      : appColors.common.characterPrimary
                  }
                />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Type  */}
        <View style={$filterItem}>
          <Typography preset="label01" text={"Type"} style={$labelStyle} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={LoggingFilterTypes}
            keyExtractor={(item, index) => `logging-type-filter-${item.id}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={onChangeLogType(item.id)}
                style={[
                  $systemItem,
                  {
                    backgroundColor:
                      currentLogType === item.id
                        ? appColors.common.bgRed
                        : appColors.palette.neutral200,
                  },
                ]}
              >
                <Tag
                  label={item.displayName}
                  color={
                    currentLogType === item.id
                      ? appColors.palette.neutral0
                      : appColors.common.characterPrimary
                  }
                />
              </TouchableOpacity>
            )}
          />
        </View>
        {/* Type  */}
        <View style={$filterItem}>
          <Typography preset="label01" text={"Type"} style={$labelStyle} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={LoggingFilterStatus}
            keyExtractor={(item, index) => `logging-type-filter-${item.id}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={onChangeLogStatus(item.id)}
                style={[
                  $systemItem,
                  {
                    backgroundColor:
                      currentStatus === item.id
                        ? appColors.common.bgRed
                        : appColors.palette.neutral200,
                  },
                ]}
              >
                <Tag
                  label={item.displayName}
                  color={
                    currentStatus === item.id
                      ? appColors.palette.neutral0
                      : appColors.common.characterPrimary
                  }
                />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Type  */}
        <View style={$filterItem}>
          <Typography preset="label01" text={"Event time"} style={$labelStyle} />
          <DatePickerField
            multiple
            fromDate={loggingFilter.fromDate}
            toDate={loggingFilter.toDate}
            onChangeFromDate={onChangeFromDate}
            onChangeToDate={onChangeToDate}
          />
        </View>
      </ScrollView>

      <View style={$bottomAction}>
        <Button
          text="Reset"
          onPress={handleOnResetFilter}
          preset="secondary"
          style={$resetButton}
        />
        <Divider size={spacing.size12} type="vertical" />
        <Button text="Apply" onPress={handleOnApplyFilter} style={$applyButton} />
      </View>
      <SafeAreaView edges={["bottom"]} />
    </View>
  )
})

const $viewContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.size16,
}
const $contentContainer: ViewStyle = {
  flex: 1,
}

const $filterItem: ViewStyle = {
  marginBottom: spacing.size16,
}

const $labelStyle: TextStyle = {
  textAlignVertical: "center",
  marginBottom: spacing.size08,
}

const $systemItem: TextStyle = {
  marginEnd: spacing.size08,
  borderRadius: radius.xs,
  backgroundColor: appColors.palette.neutral200,
  paddingHorizontal: spacing.size08,
  paddingVertical: spacing.size04,
  textAlignVertical: "center",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $bottomAction: TextStyle = {
  flexDirection: "row",
}

const $applyButton: TextStyle = {
  flex: 1,
}

const $resetButton: TextStyle = {
  flex: 1,
}
