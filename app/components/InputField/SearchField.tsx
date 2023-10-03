import { appColors, iconSizes } from "app/theme"
import React from "react"
import { View } from "react-native"
import { PhosphorIcon } from "../Icon/PhosphorIcon"
import { TextField, TextFieldProps } from "./TextField"

const $searchPresets = {
  plat: {
    activeBorderColor: appColors.palette.transparent,
    inputWrapperStyle: {
      backgroundColor: appColors.components.tag.containerBlue,
      borderColor: appColors.palette.transparent,
    },
  } as TextFieldProps,
  outline: { activeBorderColor: appColors.palette.red300 } as TextFieldProps,
}

type Presets = keyof typeof $searchPresets

export interface SearchFieldProps extends Omit<TextFieldProps, "ref"> {
  /**
   * One of the different types of search field presets.
   */
  preset?: Presets
}

function SearchField(props: SearchFieldProps) {
  const [value, setValue] = React.useState(props.value || "")

  const onClear = () => {
    setValue("")
    props?.onChangeText("")
  }

  const onChangeText = (text: string) => {
    setValue(text)
    props?.onChangeText(text)
  }

  const $searchPresetsStyles = $searchPresets[props?.preset || "outline"]
  return (
    <TextField
      {...props}
      {...$searchPresetsStyles}
      LeftAccessory={(props) => (
        <View {...props}>
          <PhosphorIcon name="MagnifyingGlass" size={iconSizes.xsmall} />
        </View>
      )}
      value={value}
      onChangeText={onChangeText}
      onClear={onClear}
    />
  )
}

export default SearchField
