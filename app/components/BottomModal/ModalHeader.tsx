import { Typography } from "../Typography"
import { PhosphorIcon } from "app/components/Icon/PhosphorIcon"
import { appColors } from "app/theme"
import { responsiveHeight } from "app/utils/screens"
import { flatten } from "ramda"
import * as React from "react"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottomColor: appColors.palette.black100,
  borderBottomWidth: 1,
  paddingBottom: responsiveHeight(16),
  marginBottom: responsiveHeight(16),
}

export interface ModalHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  label: string
  onCLose: () => void
}

/**
 * Describe your component here
 */
export function ModalHeader(props: ModalHeaderProps) {
  const { style, label, onCLose } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Typography text={label} preset="title02" />
      <TouchableOpacity onPress={onCLose}>
        <PhosphorIcon name="XCircle" />
      </TouchableOpacity>
    </View>
  )
}
