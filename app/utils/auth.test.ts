import {
  AuthStorageEnum,
  clearSessionStorage,
  loadSessionStorage,
  saveSessionStorage,
} from "./auth"

describe("auth.ts", () => {
  const auth = {
    [AuthStorageEnum.AccessToken]: "testValue",
    [AuthStorageEnum.AccessTokenExpiredIn]: 1,
  }
  it("functions correctly", () => {
    saveSessionStorage(
      auth[AuthStorageEnum.AccessToken],
      auth[AuthStorageEnum.AccessTokenExpiredIn],
    )
    const { accessToken, accessTokenExpiredIn } = loadSessionStorage()
    expect(accessToken).toEqual(auth[AuthStorageEnum.AccessToken])
    expect(accessTokenExpiredIn).toEqual(auth[AuthStorageEnum.AccessTokenExpiredIn])
    clearSessionStorage()
  })
})
