import { IFilterOptions } from "./content.types"

export const FetchWithFiltersBody = ({ ADD_DATE, CARRIER_OPERATION, DRIVER_TOTAL, NBR_POWER_UNIT, PC_FLAG, PHY_STATE, PAGE_NUMBER }: IFilterOptions) => ({
  query: `{
    fetchWithFilters(input: {
        ADD_DATE: { to: "${ADD_DATE.to}", from: "${ADD_DATE.from}" }
        NBR_POWER_UNIT: ${NBR_POWER_UNIT}
        DRIVER_TOTAL: ${DRIVER_TOTAL}
        PHY_STATE: "${PHY_STATE}",
        PC_FLAG: "${PC_FLAG}",
        CARRIER_OPERATION: "${CARRIER_OPERATION}",
        PAGE_NUMBER: ${PAGE_NUMBER},
    }) {
        count
        results {
            DOT_NUMBER
            LEGAL_NAME
            DBA_NAME
            CARRIER_OPERATION
            HM_FLAG
            PC_FLAG
            PHY_STREET
            PHY_CITY
            PHY_STATE
            PHY_ZIP
            PHY_COUNTRY
            MAILING_STREET
            MAILING_CITY
            MAILING_STATE
            MAILING_ZIP
            MAILING_COUNTRY
            TELEPHONE
            FAX
            EMAIL_ADDRESS
            MCS150_DATE
            MCS150_MILEAGE
            MCS150_MILEAGE_YEAR
            ADD_DATE
            OIC_STATE
            NBR_POWER_UNIT
            DRIVER_TOTAL
        }
    }
}`
})

export const FetchWithFiltersTag = "fetchWithFilters"