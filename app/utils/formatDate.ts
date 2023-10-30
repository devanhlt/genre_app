import { Locale, format, isValid, parseISO } from "date-fns"
import I18n from "i18n-js"

import en from "date-fns/locale/en-US"
import vi from "date-fns/locale/vi"

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  const locale = I18n.currentLocale().split("-")[0]
  return locale === "vi" ? vi : locale === "en" ? en : vi
}

export const formatDate = (date: any, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  const isoDate = parseISO(date)

  if (isValidDate(date)) {
    return format(date as unknown as Date | number, dateFormat ?? "yyyy-MM-dd", dateOptions)
  }

  if (isValidDate(parseISO(date))) {
    return format(isoDate, dateFormat ?? "yyyy-MM-dd", dateOptions)
  }

  if (isValidDate(new Date(date))) {
    return format(new Date(date), dateFormat ?? "yyyy-MM-dd", dateOptions)
  }

  return false
}

export const isValidDate = (date: any) => {
  return isValid(date)
}
