import React from "react"
import { ScrollView } from "react-native"
import ConfigSystemItem from "./ConfigSystemItem"

export const ConfigSystemTab = () => {
  return (
    <ScrollView>
      <ConfigSystemItem system="EKYC_API" />
      <ConfigSystemItem system="GENLINK_API" />
      <ConfigSystemItem system="GENLINK_WEB" />
      <ConfigSystemItem system="GENOVA_API" />
      <ConfigSystemItem system="GENOVA_WEB" />
    </ScrollView>
  )
}
