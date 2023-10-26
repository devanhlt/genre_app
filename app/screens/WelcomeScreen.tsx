import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Alert, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Typography } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { appColors, spacing } from "app/theme"
import { AppImgs } from "app/assets"
import { useHeader } from "app/hooks/useHeader"
import { useSafeAreaInsetsStyle } from "app/hooks/useSafeAreaInsetsStyle"

interface WelcomeScreenProps extends AppStackScreenProps<"Main"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  // const { navigation } = _props
  const {
    authStore: { logout },
  } = useStores()

  function goNext() {
    return null
  }

  const handleLogout = () => {
    return Alert.alert("Confirm", "Are you sure?", [
      {
        text: "Close",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          logout()
        },
      },
    ])
  }

  useHeader({
    rightTx: "common.logOut",
    onRightPress: handleLogout,
  })

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={AppImgs.appLogo} resizeMode="contain" />
        <Typography
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="body02"
        />
        <Typography tx="welcomeScreen.exciting" preset="body02" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Typography tx="welcomeScreen.postscript" />
        <Button testID="next-screen-button" tx="welcomeScreen.letsGo" onPress={goNext} />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: appColors.common.bgWhite,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.size24,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: appColors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.size24,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.size48,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.size16,
}
