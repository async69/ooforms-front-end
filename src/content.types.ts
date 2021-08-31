import { ErrorType } from "./constants/interfaces"

export interface IDateFilter {
  from: string
  to: string
}

export interface IFilterOptions {
  ADD_DATE: IDateFilter
  NBR_POWER_UNIT: number
  DRIVER_TOTAL: number
  PHY_STATE: string
  CARRIER_OPERATION: string
  PC_FLAG: string
  PAGE_NUMBER: number
}

export interface IContent {
  DOT_NUMBER: string
  LEGAL_NAME: string
  DBA_NAME: string
  CARRIER_OPERATION: string
  HM_FLAG: string
  PC_FLAG: string
  PHY_STREET: string
  PHY_CITY: string
  PHY_STATE: string
  PHY_ZIP: string
  PHY_COUNTRY: string
  MAILING_STREET: string
  MAILING_CITY: string
  MAILING_STATE: string
  MAILING_ZIP: string
  MAILING_COUNTRY: string
  TELEPHONE: string
  FAX: string
  EMAIL_ADDRESS: string
  MCS150_DATE: string
  MCS150_MILEAGE: string
  MCS150_MILEAGE_YEAR: string
  ADD_DATE: string
  OIC_STATE: string
  NBR_POWER_UNIT: string
  DRIVER_TOTAL: string
}

export interface IContentDoc extends IContent {
  _id: string
  error: ErrorType
  createdAt?: string
  updatedAt?: string
}