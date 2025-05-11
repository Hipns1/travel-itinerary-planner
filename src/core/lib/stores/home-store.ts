import { ItemTravelProps } from '@/core/services'
import { create } from 'zustand'

interface TravelModalState {
  isOpen: boolean
  isNew: boolean
  travelSelected?: ItemTravelProps | null
}

interface HomeStore {
  travelModal: TravelModalState
  setTravelModal: (travelModal: TravelModalState) => void
  flagForMutation: boolean
  setFlagForMutation: (value: boolean) => void
  resetStore: () => void
}

export const useHomeStore = create<HomeStore>((set) => ({
  travelModal: { isOpen: false, isNew: true, travelSelected: null },
  setTravelModal: (travelModal) => set({ travelModal }),
  flagForMutation: false,
  setFlagForMutation: (value) => set({ flagForMutation: value }),
  resetStore: () => set({ travelModal: { isOpen: false, isNew: true, travelSelected: null }, flagForMutation: false })
}))
