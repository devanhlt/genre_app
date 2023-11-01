import { ApisauceInstance, create } from "apisauce"
import { IRootStore } from "app/models"
import { loadSessionStorage } from "app/utils/auth"
import Config from "../../config"
import type { ApiConfig } from "./api.types"
import { HttpStatus } from "./httpStatus"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 5000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class ApiServices {
  apisauce: ApisauceInstance
  config: ApiConfig
  store: IRootStore

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(store?: IRootStore, config: ApiConfig = DEFAULT_API_CONFIG) {
    this.store = store
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
    /**
     * Request interceptor
     */
    this.apisauce.axiosInstance.interceptors.request.use(
      (config) => {
        const { accessToken } = loadSessionStorage()
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    this.apisauce.addResponseTransform(async (response) => {
      if (response.status === HttpStatus.UNAUTHORIZED) {
        if (this.store?.authStore) {
          await this.store.authStore.logout()
        }
      }
    })

    /**
     * Response interceptor
     */
    this.apisauce.axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }
}
