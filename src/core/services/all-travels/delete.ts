import { travelsApi } from '../travel-api'

export const deleteTravel = async (id: string | undefined) => {
  return travelsApi.delete(`/all-travels?id=${id}`)
}
