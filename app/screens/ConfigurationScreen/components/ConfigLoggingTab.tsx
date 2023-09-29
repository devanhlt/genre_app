import React from "react"
import { ScrollView } from "react-native"
import ConfigLoggingItem from "./ConfigLoggingItem"

export const ConfigLoggingTab = () => {
  return (
    <ScrollView>
      <ConfigLoggingItem level="0" color="#30f00e" name="Success" />
      <ConfigLoggingItem level="1" color="#f0f00e" name="Warning" />
      <ConfigLoggingItem level="2" color="#f00e1a" name="Error" />
    </ScrollView>
  )
}
