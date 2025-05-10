import { useConditionalSWR } from '@/core/hooks'
import { ItemTravelProps, travelsApi } from '@/core/services'
import { SWRResponse } from 'swr'

export const getAllTravels = (): SWRResponse<ItemTravelProps[]> => {
  return useConditionalSWR('/all-travels', true)
}
