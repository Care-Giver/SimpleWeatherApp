// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
const API_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0"

/**f
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number

  serviceKey: string
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 10000,

  // ? 일반 인증키 (Decoding)
  serviceKey:
    "x1lxDAqd0yLokenciKq3QHqcLlhdoArS3Q2c0Udfhu7OxvamW3bi8nvhbycXOUp0LRlfss9Ow4UJgLj2MXTxEw==",
}
