import React from "react"
import { TextField, TextFieldAccessoryProps, TextFieldProps } from "./TextField"
import { appColors, iconSizes } from "app/theme"
import { Icon } from "../Icon"

export interface PasswordFieldProps extends Omit<TextFieldProps, "ref"> {
  /**
   * One of the different types of button presets.
   */
}

function PasswordField(props: PasswordFieldProps) {
  const [value, setValue] = React.useState(props.value || "")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = React.useState(true)
  const onClear = () => setValue("")

  const PasswordRightAccessory = React.useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={appColors.common.characterRedDefault}
            containerStyle={props.style}
            size={iconSizes.small}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )
  return (
    <TextField
      {...props}
      secureTextEntry={isAuthPasswordHidden}
      value={value}
      onChangeText={(text) => setValue(text)}
      onClear={onClear}
      RightAccessory={PasswordRightAccessory}
    />
  )
}

export default PasswordField