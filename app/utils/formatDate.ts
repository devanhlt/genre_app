import { Locale, format, isValid, parseISO } from "date-fns"
import I18n from "i18n-js"

import en from "date-fns/locale/en-US"
import vi from "date-fns/locale/vi"

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  const locale = I18n.currentLocale().split("-")[0]
  return locale === "vi" ? vi : locale === "en" ? en : vi
}

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  return format(parseISO(date), dateFormat ?? "yyyy-MM-dd", dateOptions)
}

export const isValidDate = (date: unknown) => {
  return isValid(date)
}
