import { ItemTravelProps, travelsApi } from '@/core/services'

export const postTravel = async (travel: ItemTravelProps) => {
  return travelsApi.post('/all-travels', travel)
}
