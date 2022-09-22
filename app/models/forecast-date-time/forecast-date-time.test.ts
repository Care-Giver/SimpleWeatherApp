import { ForecastDateTimeModel } from "./forecast-date-time"

test("can be created", () => {
  const instance = ForecastDateTimeModel.create({})

  expect(instance).toBeTruthy()
})
