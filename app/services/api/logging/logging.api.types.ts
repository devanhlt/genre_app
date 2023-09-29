/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { Logging } from "app/models/system/logging"

export interface FilterLoggingPayload {
  keyword: string
  pageNumber: number
  pageSize: number
  pageDraw: number
  fromDate: Date
  toDate: Date
}

export interface ApiSystemLoggingResponse {
  lstSystemLogging: {
    content: Logging[]
  }
  totalCount: number
  recordsFiltered: number
  recordsTotal: number
}
