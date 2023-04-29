import { describe, it, expect } from "vitest"
import { getTextByNumber, secondsWords, symbolsWords } from "../timeUtils"

describe("seconds text", () => {
  it("correct seconds text", () => {
    expect(getTextByNumber(1, secondsWords)).eql("секунда")
    expect(getTextByNumber(5, secondsWords)).eql("секунд")
    expect(getTextByNumber(100, secondsWords)).eql("секунд")
    expect(getTextByNumber(233, secondsWords)).eql("секунды")
    expect(getTextByNumber(183, secondsWords)).eql("секунды")
  })

  it("correct symbols text", () => {
    expect(getTextByNumber(1, symbolsWords)).eql("символ")
    expect(getTextByNumber(5, symbolsWords)).eql("символов")
    expect(getTextByNumber(100, symbolsWords)).eql("символов")
    expect(getTextByNumber(233, symbolsWords)).eql("символа")
    expect(getTextByNumber(183, symbolsWords)).eql("символа")
    expect(getTextByNumber(555, symbolsWords)).eql("символов")
  })
})
