import type { userType } from './users'

export type contactType = userType & {
  custom_fields_values: customFieldsValuesType
}

export type customFieldsValuesType = {
  field_code: string
  field_id: number
  field_name: string
  field_type: string
  values: {
    enum_code: string
    enum_id: number
    value: string
  }[]
}[]
