import { Animated } from "react-native"
import { pvcShadow } from "./shadow"
import { shape } from "./shape"

describe("theming", () => {
  describe("shape.ts", () => {
    it("circle should return 50 when pass 100", () => {
      expect(shape.circle(100)).toEqual(50)
    })
  })

  describe("shadow.ts", () => {
    it("elevation instanceof Animated.Value", () => {
      const shadowAnimated = pvcShadow(new Animated.Value(1))
      expect(shadowAnimated).toMatchObject(shadowAnimated)
    })
  })
})
