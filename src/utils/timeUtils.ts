export function getTextByNumber(seconds: number, words: string[]): string {
  const lastDigit: number = Number(String(seconds).slice(-1))
  const lastTwoDigits: number = Number(String(seconds).slice(-2))

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return words[0]
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return words[1]
  } else {
    return words[2]
  }
}

export const secondsWords: string[] = ["секунда", "секунды", "секунд"]

export const symbolsWords: string[] = ["символ", "символа", "символов"]