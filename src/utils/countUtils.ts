import { getTextByNumber, symbolsWords } from "@/utils/timeUtils"

export const accuracyPercentCount = (mistakeCount: number, wordsLength: number): string => {
  const accuracy: number = (100 - Math.round((mistakeCount / (wordsLength + mistakeCount)) * 100)) || 100
  if(accuracy > 100) return "100%"
  return `${accuracy}%`
}

export const speedCount = (timeStart: number, wordsLength: number): string => {
  const seconds: number = Math.round((Date.now() - timeStart) / 1000) || 1
  const speed: number = Math.round((wordsLength / seconds) * 60) || 0
  return `${speed} ${getTextByNumber(speed, symbolsWords)} в минуту`
}