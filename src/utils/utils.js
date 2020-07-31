export function pxToRem(px) {
  const ratio = 375 / 10
  return px / ratio
}

export function getCurPx(px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}
