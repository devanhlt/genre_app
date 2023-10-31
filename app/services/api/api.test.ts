import MockAdapter from "axios-mock-adapter"
import { ApiServices } from "./api"
import { loadSessionStorage } from "app/utils/auth"

jest.mock("../../utils/auth", () => ({
  loadSessionStorage: jest.fn(),
}))

describe("ApiServices", () => {
  const apiServices = new ApiServices({
    url: "https://jsonplaceholder.typicode.com/",
    timeout: 100000,
  })

  test("return correctly", async () => {
    const mock = new MockAdapter(apiServices.apisauce.axiosInstance)
    ;(loadSessionStorage as jest.Mock).mockReturnValue({ accessToken: "access_token" })

    mock.onGet("/todo").reply(200, {
      todos: [],
    })
    const response = await apiServices.apisauce.get("/todo")
    expect(response.ok).toEqual(true)
  })

  test("return network error and header access token is empty", async () => {
    ;(loadSessionStorage as jest.Mock).mockReturnValue({ accessToken: null })
    const mock = new MockAdapter(apiServices.apisauce.axiosInstance)
    mock.onGet("/todo").networkError()
    const response = await apiServices.apisauce.get("/todo")
    expect(response.ok).toEqual(false)
    expect(response.problem).toEqual("NETWORK_ERROR")
  })

  test("throw request error", async () => {
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
})
