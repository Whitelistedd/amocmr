export const formatSecondsToDate = (seconds: number) => {
  const date = new Date(0)
  date.setUTCSeconds(seconds)
  return date
}
