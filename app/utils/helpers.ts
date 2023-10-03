export const stringToJson = (string: string) => {
  try {
    return !!string && JSON.parse(string)
  } catch (error) {
    return null
  }
}

export const jsonToString = (value: any): string => {
  try {
    return value ? JSON.stringify(value) : ""
  } catch (error) {
    return ""
  }
}
