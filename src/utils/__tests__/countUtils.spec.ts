import { describe, it, expect } from "vitest"
import { accuracyPercentCount } from "../countUtils"

describe("count utils", () => {
  it("accuracy percent count", () => {
    expect(accuracyPercentCount(0, 0)).eql("100%")
    expect(accuracyPercentCount(5, 100)).eql("95%")
    expect(accuracyPercentCount(0, 20)).eql("100%")
  })
})