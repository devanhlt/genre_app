import React, { Suspense } from "react"

import { SvgIcons, SvgIconsType } from "app/assets/svg"
import { SvgCss, SvgProps, loadLocalRawResource } from "react-native-svg"
import { Loading } from "../Loading"

interface IconProps extends SvgProps {
  /**
   * The name of the icon
   */
  name: SvgIconsType
}

export const SvgIcon = ({ name, ...rest }: IconProps) => {
  if (typeof name !== "string" || !Object.keys(SvgIcons).includes(name)) {
    console.warn(
      `Variant ${name} was not provided properly. Valid variants are ${Object.keys(SvgIcons).join(
        ", ",
      )}.`,
    )
    return <></>
  }
  const Icon = SvgIcons[name as string] as any

  const [xml, setXml] = React.useState<string | null>(null)
  React.useEffect(() => {
    ;(async () => {
      await loadLocalRawResource(Icon).then(setXml)
    })()
  }, [Icon])

  if (!xml) return <Loading />

  return (
    <Suspense fallback={<Loading />}>
      <SvgCss xml={xml} {...rest} />
    </Suspense>
  )
}
