import { useNavigation } from "@react-navigation/native"
import React, { useLayoutEffect } from "react"

import { Header, HeaderProps } from "app/components/Header"

export function useHeader(
  headerProps: HeaderProps,
  deps: Parameters<typeof useLayoutEffect>[1] = [],
) {
  const navigation = useNavigation()

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header {...headerProps} />,
    })
  }, [...deps, navigation])
}
