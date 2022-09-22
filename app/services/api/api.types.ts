import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetMoviesResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem

// "data": Object {
//   "response": Object {
//     "body": Object {
//       "dataType": "JSON",
//       "items": Object {
//         "item": Array [
//           Object {
//             "baseDate": "20220922",
//             "baseTime": "1100",
//             "category": "PTY",
//             "nx": 55,
//             "ny": 128,
//             "obsrValue": "0",
//           },
//           Object {
//             "baseDate": "20220922",
//             "baseTime": "1100",
//             "category": "REH",
//             "nx": 55,
//             "ny": 128,
//             "obsrValue": "49",
//           },
//           Object {
//             "baseDate": "20220922",
//             "baseTime": "1100",
//             "category": "RN1",
//             "nx": 55,
//             "ny": 128,
//             "obsrValue": "0",
//           },
//           Object {
//             "baseDate": "20220922",
//             "baseTime": "1100",
//             "category": "T1H",
//             "nx": 55,
//             "ny": 128,
//             "obsrValue": "23.4",
//           },
//           Object {
//             "baseDate": "20220922",
//             "baseTime": "1100",
//             "category": "UUU",
//             "nx": 55,
//             "ny": 128,
//             "obsrValue": "1.9",
//           },
//           Object {
//             "baseDate": "20220922",
//             "baseTime": "1100",
//             "category": "VEC",
//             "nx": 55,
//             "ny": 128,
//             "obsrValue": "230",
//           },
//           Object {
//             "baseDate": "20220922",
//             "baseTime": "1100",
//             "category": "VVV",
//             "nx": 55,
//             "ny": 128,
//             "obsrValue": "1.6",
//           },
//           Object {
//             "baseDate": "20220922",
//             "baseTime": "1100",
//             "category": "WSD",
//             "nx": 55,
//             "ny": 128,
//             "obsrValue": "2.5",
//           },
//         ],
//       },
//       "numOfRows": 1000,
//       "pageNo": 1,
//       "totalCount": 8,
//     },
//     "header": Object {
//       "resultCode": "00",
//       "resultMsg": "NORMAL_SERVICE",
//     },
//   },
// },

type UltraSrtNcstItem = {
  baseDate: string
  baseTime: string
  category: string
  nx: number
  ny: number
  obsrValue: string
}
export interface GetUltraSrtNcstResultType {
  items: { item: UltraSrtNcstItem[] }
  numOfRows: number
  pageNo: number
  totalCount: number
}

export type GetUltraSrtNcstResult =
  | { kind: "ok"; weather: GetUltraSrtNcstResultType }
  | GeneralApiProblem
