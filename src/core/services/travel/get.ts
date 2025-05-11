import { SWRResponse } from 'swr'
import { ItemTravelProps } from '@/core/services'
import { useConditionalSWR } from '@/core/hooks'
import { ParamValue } from 'next/dist/server/request/params'

export const getSingleTravel = (id: ParamValue): SWRResponse<ItemTravelProps> => {
  return useConditionalSWR(`/travel?travelId=${id}`, true)
}
