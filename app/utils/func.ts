/**
 * A
 *
 */
export const noop = () => undefined

export function isFunction(fn: any) {
  return typeof fn === "function"
}

export function isString(value: any): value is string {
  return typeof value === "string"
}

export function isObject(value: any) {
  return value !== null && typeof value === "object"
}
