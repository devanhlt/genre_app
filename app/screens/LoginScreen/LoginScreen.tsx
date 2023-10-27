import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, View, ViewStyle } from "react-native"

import { Button, Icon, Screen, SvgIcon, TextField, TextFieldAccessoryProps } from "app/components"
import { useStores } from "app/models"
import { AuthRequestModel } from "app/models/auth/types"
import { AppStackScreenProps } from "app/navigators"
import { appColors, iconSizes, spacing } from "app/theme"
import { responsiveWidth } from "app/utils/screens"
import { useLoading } from "app/hooks/useLoading"
import { delay } from "app/utils/delay"

interface LoginScreenProps extends AppStackScreenProps<"LoginScreen"> {}

/**
 * Define icon sizes
 */
const iconWidth = responsiveWidth(120)
const iconHeight = responsiveWidth(120)

/**
 * Validation authenticated field
 * @param auth AuthModel
 * @returns
 */
function validationErrors(auth: AuthRequestModel) {
  return {
    username: (function () {
      if (!auth.username?.length) return "can't be blank"
      return ""
    })(),
    password: (function () {
      if (!auth.password?.length) return "can't be blank"
      return ""
    })(),
  }
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    authStore: { username, loginWithUsernameAndPassword },
  } = useStores()

  const { hide: hideLoading, show: showLoading } = useLoading()

  const [auth, setAuth] = useState<AuthRequestModel>({
    username,
    password: "",
  })

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
  }, [])

  const authValidationErrors = useMemo(() => validationErrors(auth), [auth])

  const errors: typeof authValidationErrors = isSubmitted ? authValidationErrors : ({} as any)

  const PasswordRightAccessory = useMemo(
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

  /**
   * That is called cleanup when the component unmounts
   */
  useEffect(() => {
    return () => {
      setAuth({ username: "", password: "" })
    }
  }, [])

  /**
   * Callback that is called when the text input's username changes.
   * Changed text is passed as an argument to the callback handler.
   */
  const onChangeUsername = (username: string) => setAuth({ ...auth, username })

  /**
   * Callback that is called when the text input's password changes.
   * Changed text is passed as an argument to the callback handler.
   */
  const onChangePassword = (password: string) => setAuth({ ...auth, password })

  /**
   * Callback that is called when submit button is pressed.
   */
  async function onLogin() {
    setIsSubmitted(true)

    if (Object.values(authValidationErrors).some((v) => !!v)) return

    showLoading()
    await delay(1000)
    // Make a request to your server to get an authentication token.
    await loginWithUsernameAndPassword(auth)
    hideLoading()
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    // We'll mock this with a fake token.
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={$logo}>
        <SvgIcon name="LogoRed" width={iconWidth} height={iconHeight} />
      </View>

      <TextField
        value={auth.username}
        id="auth-username"
        testID="auth-username"
        onChangeText={onChangeUsername}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        labelTx="loginScreen.usernameFieldLabel"
        placeholderTx="loginScreen.usernameFieldPlaceholder"
        helper={errors?.username}
        status={errors?.username ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        id="auth-password"
        testID="auth-password"
        value={auth.password}
        onChangeText={onChangePassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        helper={errors?.password}
        status={errors?.password ? "error" : undefined}
        onSubmitEditing={onLogin}
        clearRightAccessory={false}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="primary"
        onPress={onLogin}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.size48,
  paddingHorizontal: spacing.size24,
}

const $logo: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.size32,
  height: iconHeight,
}

const $textField: ViewStyle = {
  marginBottom: spacing.size24,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.size32,
}
