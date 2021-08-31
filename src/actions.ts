import Axios from "axios"
import endPoints from "./constants/endPoints"
import {
  FetchWithFiltersBody, FetchWithFiltersTag
} from "./Query"
import { IFilterOptions, IContentDoc } from "./content.types"

export type { IContentDoc }

export const FetchWithFilters = ({ ADD_DATE, PHY_STATE, PC_FLAG, CARRIER_OPERATION, NBR_POWER_UNIT, DRIVER_TOTAL, PAGE_NUMBER }: IFilterOptions, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchWithFiltersBody({ ADD_DATE, PHY_STATE, PC_FLAG, CARRIER_OPERATION, NBR_POWER_UNIT, DRIVER_TOTAL, PAGE_NUMBER }))
    .then(res => {
      if (res.data.data[FetchWithFiltersTag].error) {
        callback(res.data.data[FetchWithFiltersTag].error, null)
      } else {
        callback(null, res.data.data[FetchWithFiltersTag])
      }
    })
    .catch(err => console.log("Error", err))
}