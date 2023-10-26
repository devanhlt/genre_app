import * as storage from "./storage"

export enum AuthStorageEnum {
  AccessToken = "access_token",
  AccessTokenExpiredIn = "refresh_token_expired_time",
}

export const loadSessionStorage = () => {
  const accessToken = storage.load(AuthStorageEnum.AccessToken)
  const accessTokenExpiredIn = storage.load(AuthStorageEnum.AccessTokenExpiredIn)
  return { accessToken, accessTokenExpiredIn }
}

export const saveSessionStorage = (accessToken: string, expiresIn: number) => {
  storage.save(AuthStorageEnum.AccessToken, accessToken)
  storage.save(AuthStorageEnum.AccessTokenExpiredIn, expiresIn)
}

export const clearSessionStorage = () => {
  storage.remove(AuthStorageEnum.AccessToken)
  storage.remove(AuthStorageEnum.AccessTokenExpiredIn)
}
