import * as React from "react"

interface IfProps {
  condition?: boolean
  children: React.ReactNode
}

export const If = (props: IfProps) => {
  const { condition = false, children = <></> } = props

  if (condition) return children

  return null
}
