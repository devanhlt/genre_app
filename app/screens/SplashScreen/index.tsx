import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageBackground, ImageStyle, View, ViewStyle } from "react-native"

import { AppImgs } from "app/assets"
import { SvgIcon } from "app/components"
import { appColors } from "app/theme"
import { responsiveHeight, responsiveWidth } from "app/utils/screens"

interface SplashScreenProps {
  // Props here!
  useImageBackground?: boolean
}

export const SplashScreen: FC<SplashScreenProps> = observer(function SplashScreen({
  useImageBackground = false,
}) {
  if (useImageBackground) {
    return (
      <ImageBackground style={$container} source={AppImgs.splashBg} resizeMode="cover">
        <View style={$viewStyle}>
          <Image style={$logo} source={AppImgs.appLogo} resizeMode="contain" />
        </View>
      </ImageBackground>
    )
  }

  const iconWidth = responsiveWidth(120)
  const iconHeight = responsiveWidth(120)

  return (
    <View style={$container}>
      <SvgIcon name="LogoWhite" width={iconWidth} height={iconHeight} />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: appColors.common.bgRed,
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
}

const $viewStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $logo: ImageStyle = {
  width: responsiveWidth(210),
  height: responsiveHeight(100),
}
