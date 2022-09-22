import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { ForecastDateTimeSnapshot, Location, LocationSnapshot } from "../../models"

/**
 * Manages all requests to the API.
 */

export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * 위치와 원하는 예보시간을 입력하면 날씨현황정보를 가저옵니다.
   */
  async getWeatherStatus(
    location: LocationSnapshot,
    forecastDateTime: ForecastDateTimeSnapshot,
  ): Promise<Types.GetUltraSrtNcstResult> {
    const { nx, ny } = location
    const { baseDate, baseTime } = forecastDateTime

    //* 기상청 api call 요청하기
    //? getUltraSrtNcst 는 초단기예보 현황정보를 위한 url 입니다
    const response: ApiResponse<any> = await this.apisauce.get(`/getUltraSrtNcst`, {
      serviceKey: this.config.serviceKey, //? 기상청 api 서비스키
      pageNo: 1,
      numOfRows: 1000,
      dataType: "JSON",
      base_date: baseDate,
      base_time: baseTime,
      nx: nx,
      ny: ny,
    })

    //? response 출력값 console.log(response)
    /* Object {
      "config": Object {
        "adapter": [Function xhrAdapter],
        "baseURL": "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0",
        "data": undefined,
        "headers": Object {
          "Accept": "application/json",
        },
        "maxBodyLength": -1,
        "maxContentLength": -1,
        "method": "get",
        "params": Object {
          "base_date": "20220922",
          "base_time": "1100",
          "dataType": "JSON",
          "numOfRows": 1000,
          "nx": 55,
          "ny": 128,
          "pageNo": 1,
          "serviceKey": "x1lxDAqd0yLokenciKq3QHqcLlhdoArS3Q2c0Udfhu7OxvamW3bi8nvhbycXOUp0LRlfss9Ow4UJgLj2MXTxEw==",
        },
        "timeout": 10000,
        "transformRequest": Array [
          [Function transformRequest],
        ],
        "transformResponse": Array [
          [Function transformResponse],
        ],
        "transitional": Object {
          "clarifyTimeoutError": false,
          "forcedJSONParsing": true,
          "silentJSONParsing": true,
        },
        "url": "/getUltraSrtNcst",
        "validateStatus": [Function validateStatus],
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
      },
      "data": Object {
        "response": Object {
          "body": Object {
            "dataType": "JSON",
            "items": Object {
              "item": Array [
                Object {
                  "baseDate": "20220922",
                  "baseTime": "1100",
                  "category": "PTY",
                  "nx": 55,
                  "ny": 128,
                  "obsrValue": "0",
                },
                Object {
                  "baseDate": "20220922",
                  "baseTime": "1100",
                  "category": "REH",
                  "nx": 55,
                  "ny": 128,
                  "obsrValue": "49",
                },
                Object {
                  "baseDate": "20220922",
                  "baseTime": "1100",
                  "category": "RN1",
                  "nx": 55,
                  "ny": 128,
                  "obsrValue": "0",
                },
                Object {
                  "baseDate": "20220922",
                  "baseTime": "1100",
                  "category": "T1H",
                  "nx": 55,
                  "ny": 128,
                  "obsrValue": "23.4",
                },
                Object {
                  "baseDate": "20220922",
                  "baseTime": "1100",
                  "category": "UUU",
                  "nx": 55,
                  "ny": 128,
                  "obsrValue": "1.9",
                },
                Object {
                  "baseDate": "20220922",
                  "baseTime": "1100",
                  "category": "VEC",
                  "nx": 55,
                  "ny": 128,
                  "obsrValue": "230",
                },
                Object {
                  "baseDate": "20220922",
                  "baseTime": "1100",
                  "category": "VVV",
                  "nx": 55,
                  "ny": 128,
                  "obsrValue": "1.6",
                },
                Object {
                  "baseDate": "20220922",
                  "baseTime": "1100",
                  "category": "WSD",
                  "nx": 55,
                  "ny": 128,
                  "obsrValue": "2.5",
                },
              ],
            },
            "numOfRows": 1000,
            "pageNo": 1,
            "totalCount": 8,
          },
          "header": Object {
            "resultCode": "00",
            "resultMsg": "NORMAL_SERVICE",
          },
        },
      },
      "duration": 4546,
      "headers": Object {
        "access-control-allow-origin": "*",
        "content-encoding": "gzip",
        "content-language": "ko-KR",
        "content-length": "274",
        "content-type": "application/json;charset=UTF-8",
        "date": "Thu, 22 Sep 2022 12:44:03 GMT",
        "server": "Apache-Coyote/1.1",
        "set-cookie": Array [
          "JSESSIONID=S49zOTNf0gGnmDINgw12DeWUBEm0bnPMWxaDnWAWpH1X8SpQbjLxhaNN6El91fN9.amV1c19kb21haW4vbmV3c2t5Mw==; Path=/1360000/VilageFcstInfoService_2.0; HttpOnly; Domain=apis.data.go.kr",
        ],
      },
      "ok": true,
      "originalError": null,
      "problem": null,
      "status": 200,
    } */

    //* 예외 처리
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    //* 원하는 데이터만 뽑아서 가공하기
    try {
      const resultWeather: Types.GetUltraSrtNcstResultType = {
        items: response.data.response.body.item,
        numOfRows: response.data.response.body.numOfRows,
        pageNo: response.data.response.body.pageNo,
        totalCount: response.data.response.body.totalCount,
      }
      return { kind: "ok", weather: resultWeather }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * 위치와 원하는 예보시간을 입력하면 날씨예보정보를 가저옵니다.
   */
  async getWeather(location: LocationSnapshot, forecastDateTime: ForecastDateTimeSnapshot) {
    const { nx, ny } = location
    const { baseDate, baseTime } = forecastDateTime

    //* 기상청 api call 요청하기
    //? getUltraSrtNcst 는 초단기 예보정보를 위한 url 입니다
    const response: ApiResponse<any> = await this.apisauce.get(`/getUltraSrtFcst`, {
      serviceKey: this.config.serviceKey, //? 기상청 api 서비스키
      pageNo: 1,
      numOfRows: 1000,
      dataType: "JSON",
      base_date: baseDate,
      base_time: baseTime,
      nx: nx,
      ny: ny,
    })

    // console.log(response)

    //? response 출력값 console.log(response)
    /* Object {
        "config": Object {
          "adapter": [Function xhrAdapter],
          "baseURL": "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0",
          "data": undefined,
          "headers": Object {
            "Accept": "application/json",
          },
          "maxBodyLength": -1,
          "maxContentLength": -1,
          "method": "get",
          "params": Object {
            "base_date": "20220922",
            "base_time": "1100",
            "dataType": "JSON",
            "numOfRows": 1000,
            "nx": 55,
            "ny": 128,
            "pageNo": 1,
            "serviceKey": "x1lxDAqd0yLokenciKq3QHqcLlhdoArS3Q2c0Udfhu7OxvamW3bi8nvhbycXOUp0LRlfss9Ow4UJgLj2MXTxEw==",
          },
          "timeout": 10000,
          "transformRequest": Array [
            [Function transformRequest],
          ],
          "transformResponse": Array [
            [Function transformResponse],
          ],
          "transitional": Object {
            "clarifyTimeoutError": false,
            "forcedJSONParsing": true,
            "silentJSONParsing": true,
          },
          "url": "/getUltraSrtNcst",
          "validateStatus": [Function validateStatus],
          "xsrfCookieName": "XSRF-TOKEN",
          "xsrfHeaderName": "X-XSRF-TOKEN",
        },
        "data": Object {
          "response": Object {
            "body": Object {
              "dataType": "JSON",
              "items": Object {
                "item": Array [
                  Object {
                    "baseDate": "20220922",
                    "baseTime": "1100",
                    "category": "PTY",
                    "nx": 55,
                    "ny": 128,
                    "obsrValue": "0",
                  },
                  Object {
                    "baseDate": "20220922",
                    "baseTime": "1100",
                    "category": "REH",
                    "nx": 55,
                    "ny": 128,
                    "obsrValue": "49",
                  },
                  Object {
                    "baseDate": "20220922",
                    "baseTime": "1100",
                    "category": "RN1",
                    "nx": 55,
                    "ny": 128,
                    "obsrValue": "0",
                  },
                  Object {
                    "baseDate": "20220922",
                    "baseTime": "1100",
                    "category": "T1H",
                    "nx": 55,
                    "ny": 128,
                    "obsrValue": "23.4",
                  },
                  Object {
                    "baseDate": "20220922",
                    "baseTime": "1100",
                    "category": "UUU",
                    "nx": 55,
                    "ny": 128,
                    "obsrValue": "1.9",
                  },
                  Object {
                    "baseDate": "20220922",
                    "baseTime": "1100",
                    "category": "VEC",
                    "nx": 55,
                    "ny": 128,
                    "obsrValue": "230",
                  },
                  Object {
                    "baseDate": "20220922",
                    "baseTime": "1100",
                    "category": "VVV",
                    "nx": 55,
                    "ny": 128,
                    "obsrValue": "1.6",
                  },
                  Object {
                    "baseDate": "20220922",
                    "baseTime": "1100",
                    "category": "WSD",
                    "nx": 55,
                    "ny": 128,
                    "obsrValue": "2.5",
                  },
                ],
              },
              "numOfRows": 1000,
              "pageNo": 1,
              "totalCount": 8,
            },
            "header": Object {
              "resultCode": "00",
              "resultMsg": "NORMAL_SERVICE",
            },
          },
        },
        "duration": 4546,
        "headers": Object {
          "access-control-allow-origin": "*",
          "content-encoding": "gzip",
          "content-language": "ko-KR",
          "content-length": "274",
          "content-type": "application/json;charset=UTF-8",
          "date": "Thu, 22 Sep 2022 12:44:03 GMT",
          "server": "Apache-Coyote/1.1",
          "set-cookie": Array [
            "JSESSIONID=S49zOTNf0gGnmDINgw12DeWUBEm0bnPMWxaDnWAWpH1X8SpQbjLxhaNN6El91fN9.amV1c19kb21haW4vbmV3c2t5Mw==; Path=/1360000/VilageFcstInfoService_2.0; HttpOnly; Domain=apis.data.go.kr",
          ],
        },
        "ok": true,
        "originalError": null,
        "problem": null,
        "status": 200,
      } */

    //* 예외 처리
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // console.log(response.data.response.body.items.item)
    // const isRainy = response.data.response.body.items.item.filter(
    //   (element) => element.category === "RN1",
    // )

    try {
      //* 원하는 데이터만 뽑아서 가공하기
      const isRainy = response.data.response.body.items.item.filter(
        (element) => element.category === "RN1",
      )

      const futureSky = response.data.response.body.items.item.filter(
        (element) => element.category === "SKY",
      )

      console.warn("Api call 완료")
      return { kind: "ok", futureSky: futureSky, isRainy: isRainy }

      /* Object {
        "futureSky": Array [
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "SKY",
            "fcstDate": "20220922",
            "fcstTime": "2300",
            "fcstValue": "4",
            "nx": 55,
            "ny": 128,
          },
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "SKY",
            "fcstDate": "20220923",
            "fcstTime": "0000",
            "fcstValue": "4",
            "nx": 55,
            "ny": 128,
          },
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "SKY",
            "fcstDate": "20220923",
            "fcstTime": "0100",
            "fcstValue": "4",
            "nx": 55,
            "ny": 128,
          },
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "SKY",
            "fcstDate": "20220923",
            "fcstTime": "0200",
            "fcstValue": "1",
            "nx": 55,
            "ny": 128,
          },
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "SKY",
            "fcstDate": "20220923",
            "fcstTime": "0300",
            "fcstValue": "1",
            "nx": 55,
            "ny": 128,
          },
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "SKY",
            "fcstDate": "20220923",
            "fcstTime": "0400",
            "fcstValue": "1",
            "nx": 55,
            "ny": 128,
          },
        ],
        "isRainy": Array [
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "RN1",
            "fcstDate": "20220922",
            "fcstTime": "2300",
            "fcstValue": "강수없음",
            "nx": 55,
            "ny": 128,
          },
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "RN1",
            "fcstDate": "20220923",
            "fcstTime": "0000",
            "fcstValue": "강수없음",
            "nx": 55,
            "ny": 128,
          },
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "RN1",
            "fcstDate": "20220923",
            "fcstTime": "0100",
            "fcstValue": "강수없음",
            "nx": 55,
            "ny": 128,
          },
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "RN1",
            "fcstDate": "20220923",
            "fcstTime": "0200",
            "fcstValue": "강수없음",
            "nx": 55,
            "ny": 128,
          },
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "RN1",
            "fcstDate": "20220923",
            "fcstTime": "0300",
            "fcstValue": "강수없음",
            "nx": 55,
            "ny": 128,
          },
          Object {
            "baseDate": "20220922",
            "baseTime": "2230",
            "category": "RN1",
            "fcstDate": "20220923",
            "fcstTime": "0400",
            "fcstValue": "강수없음",
            "nx": 55,
            "ny": 128,
          },
        ],
        "kind": "ok",
      } */
    } catch (error) {
      console.error("Api call 실패")
      console.log(error)
      return { kind: "bad-data" }
    }
  }
}
