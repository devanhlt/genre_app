import { responsiveFontSize, responsiveHeight, responsiveWidth } from "./screens"

jest.mock("react-native", () => ({
  Dimensions: {
    get: jest.fn(() => {
      return { width: 813, height: 375 }
    }),
  },
  Platform: {
    OS: "ios",
  },
  StatusBar: {
    currentHeight: 34,
  },
}))

describe("portrait screen helper ", () => {
  it("responsiveWidth function should return 100 if you pass 100", () => {
    const data = responsiveWidth(100)
    expect(data).toEqual(100)
  })
  it("responsiveHeight function should return 100.1231527093596 if you pass 100", () => {
    const data = responsiveHeight(100)
    expect(data).toEqual(100.1231527093596)
  })

  it("responsiveFontSize function should return 100 if you pass 100", () => {
    const data = responsiveFontSize(100)
    expect(data).toEqual(100)
  })
})

describe("landspace screen helper", () => {
  beforeEach(() => {
    jest.doMock("react-native", () => ({
      Dimensions: {
        get: jest.fn(() => {
          return { width: 813, height: 375 }
        }),
      },
      Platform: {
        OS: "ios",
      },
      StatusBar: {
        currentHeight: 34,
      },
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("responsiveWidth function should return 100 if you pass 100", () => {
    const data = responsiveWidth(100)
    expect(data).toEqual(100)
  })

  it("responsiveFontSize function should return 100 if you pass 100", () => {
    const data = responsiveFontSize(100)
    expect(data).toEqual(100)
  })
})
