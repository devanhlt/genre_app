import { IRootStore } from "app/models"
import { loadSessionStorage } from "app/utils/auth"
import { noop } from "app/utils/func"
import MockAdapter from "axios-mock-adapter"
import { ApiServices } from "./api"

jest.mock("../../utils/auth", () => ({
  loadSessionStorage: jest.fn(),
}))

describe("ApiServices", () => {
  const rootStore = {
    authStore: { loading: false, authToken: "", username: "", logout: noop },
  } as IRootStore

  test("return correctly", async () => {
    const apiServices = new ApiServices(rootStore, {
      url: "https://jsonplaceholder.typicode.com/",
      timeout: 100000,
    })
    const mock = new MockAdapter(apiServices.apisauce.axiosInstance)
    ;(loadSessionStorage as jest.Mock).mockReturnValue({ accessToken: "access_token" })

    mock.onGet("/todo").reply(200, {
      correctly: [],
    })
    const response = await apiServices.apisauce.get("/todo")
    expect(response.ok).toEqual(true)
  })

  test("return network error and header access token is empty", async () => {
    const apiServices = new ApiServices(rootStore, {
      url: "https://jsonplaceholder.typicode.com/",
      timeout: 100000,
    })
    const mock = new MockAdapter(apiServices.apisauce.axiosInstance)
    ;(loadSessionStorage as jest.Mock).mockReturnValue({ accessToken: null })
    mock.onGet("/todo").networkError()
    const response = await apiServices.apisauce.get("/todo")
    expect(response.ok).toEqual(false)
    expect(response.problem).toEqual("NETWORK_ERROR")
  })

  test("should logout if api response status 401", async () => {
    const apiServices = new ApiServices(rootStore, {
      url: "https://jsonplaceholder.typicode.com/",
      timeout: 100000,
    })
    const mock = new MockAdapter(apiServices.apisauce.axiosInstance)
    ;(loadSessionStorage as jest.Mock).mockReturnValue({ accessToken: "access_token" })
    mock.onGet("/todo").reply(401, { todos: [] })
    const response = await apiServices.apisauce.get("/todo")
    expect(response.ok).toEqual(false)
    expect(response.problem).toEqual("CLIENT_ERROR")
  })

  test("throw request error", async () => {
    const apiServices = new ApiServices(rootStore, {
      url: "https://jsonplaceholder.typicode.com/",
      timeout: 100000,
    })
    const mock = new MockAdapter(apiServices.apisauce.axiosInstance)
    mock.onPost("/todo").passThrough()
    const requestError = "UNKNOWN_ERROR"
    apiServices.apisauce.axiosInstance.interceptors.request.use(
      () => {
        return Promise.reject(requestError)
      },
      (error) => Promise.reject(error),
    )
    const response = await apiServices.apisauce.post("/todo")
    expect(response.ok).toEqual(false)
    expect(response.problem).toEqual(requestError)
  })
  
  test("return correctly when using new API services with the default constructor", async () => {
    const apiServices = new ApiServices()
    const mock = new MockAdapter(apiServices.apisauce.axiosInstance)
    ;(loadSessionStorage as jest.Mock).mockReturnValue({ accessToken: "access_token" })
    mock.onGet("/todo").reply(401, { todos: [] })
    const response = await apiServices.apisauce.get("/todo")
    expect(response.ok).toEqual(false)
    expect(response.problem).toEqual("CLIENT_ERROR")
  })
})
