/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

export interface FilterLoggingPayload {
  keyword: string
  pageNumber: number
  pageSize: number
  pageDraw: number
  fromDate: Date
  toDate: Date
}
