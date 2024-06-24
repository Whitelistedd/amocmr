import { apiInstance } from '@/libs/axios'
import type { leadType } from '@/types/leads'

export const getLeads: () => Promise<leadType[]> = async () => {
  try {
    const data = await apiInstance.get('/data').then((res) => res.data)
    return data
  } catch (error) {
    return new Error('Error fetching leads')
  }
}
