export function rgba(hex: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
  return `${hex}${alpha.toString(16).padStart(2, "0")}`
}
