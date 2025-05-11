import { ItemTravelProps, travelsApi } from '@/core/services'

export const putTravel = async (travel: ItemTravelProps) => {
  return travelsApi.put(`/all-travels`, travel)
}
