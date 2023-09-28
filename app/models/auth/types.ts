export interface AuthenticateResponse {
  data: {
    access_token: string
    expires_in: number
    first_time: boolean
    id_token: string
    refresh_token: string
    token_type: string
    session_state: string
    scope: string
    remaining_login_attempts: number | null
    refresh_expires_in: number
  }
  errorCode: string | null
  message: string | null
  status: number
}

export interface UserInfo {
  name: string
  email: string
}

export type UpgradePayload = {
  id: number
  name: string
  userId: string
  phone: string
  otpCode: string
  otpId: number
  customerId: string
  generaliPhone: string
  customerIdGroup?: string
  citizenId?: string
}
