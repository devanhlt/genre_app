import { fireEvent, render, screen } from "@testing-library/react-native"
import React from "react"

import { Logging } from "app/models/system/logging"
import LoggingItem from "./LoggingItem"

const logging = {
  id: "1",
  systemName: "EKYC",
  apiReferal: "Test",
  logType: "Test",
  logCode: 1,
  logLevel: 2,
  logDetail: "Test",
  method: "POST",
  requestParam: "Test",
  requestBody: "Test",
  startTime: "Test",
  endTime: "Test",
  status: "Test",
  createdBy: "Test",
  createdDate: 1,
  updatedBy: "Test",
  updatedDate: 1,
  idStr: "Test",
  color: "red",
} as Logging

describe("LoggingItem.tsx", () => {
  it("renders correctly when item data is correctly", async () => {
    const mockFn = jest.fn()
    render(<LoggingItem item={logging} onPressItem={mockFn} />)

    const wrapper = screen.getByTestId("logging-item-test-id")

    fireEvent.press(wrapper)
  })

  it("renders correctly with color is empty", async () => {
    const mockFn = jest.fn()
    render(<LoggingItem item={{ ...logging, color: "" }} onPressItem={mockFn} />)
    const wrapper = screen.getByTestId("logging-item-test-id")
    fireEvent.press(wrapper)
  })

  it("renders null", async () => {
    const mockFn = jest.fn()
    render(<LoggingItem item={null} onPressItem={mockFn} />)
  })
})
