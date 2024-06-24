import type { customFieldsValuesType } from '@/types/contacts'

export const getPhone = (fields: customFieldsValuesType) => {
  return fields?.find((field) => field.field_code === 'PHONE')?.values[0].value
}

export const getEmail = (fields: customFieldsValuesType) => {
  return fields?.find((field) => field?.field_code === 'EMAIL')?.values[0].value
}
