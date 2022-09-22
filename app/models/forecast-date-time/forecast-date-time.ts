import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ForecastDateTimeModel = types
  .model("ForecastDateTime")
  .props({
    baseDate: types.string,
    baseTime: types.string,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ForecastDateTimeType = Instance<typeof ForecastDateTimeModel>
export interface ForecastDateTime extends ForecastDateTimeType {}
type ForecastDateTimeSnapshotType = SnapshotOut<typeof ForecastDateTimeModel>
export interface ForecastDateTimeSnapshot extends ForecastDateTimeSnapshotType {}
export const createForecastDateTimeDefaultModel = () => types.optional(ForecastDateTimeModel, {})
