import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Habit = {
  id: number
  name: string
  area: string
  repeat: string
  date: Date
  completed: boolean
}

type HabitState = {
  habits: Habit[]
  addHabit: (habit: Habit) => void
  removeHabit: (id: number) => void
  changeHabitCompleted: (id: number, completed: boolean) => void
}

export const newHabitStore = create<HabitState>()(
  persist(
    (set) => ({
      habits: [],
      addHabit: (habit: Habit) =>
        set((state) => ({ habits: [habit, ...state.habits] })),
      removeHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id != id),
        })),

      changeHabitCompleted: (id) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, completed: !habit.completed } : habit
          ),
        })),
    }),

    { name: 'habitStore', storage: createJSONStorage(() => localStorage) }
  )
)

export type Area = {
  id: number
  name: string
}

export type AreaState = {
  areas: Area[]
  addArea: (area: Area) => void
  removeArea: (id: number) => void
}

export const newAreaStore = create<AreaState>()(
  persist(
    (set) => ({
      areas: [],
      addArea: (area: Area) =>
        set((state) => ({ areas: [area, ...state.areas] })),
      removeArea: (id) =>
        set((state) => ({
          areas: state.areas.filter((area) => area.id != id),
        })),
    }),

    { name: 'areaStore', storage: createJSONStorage(() => localStorage) }
  )
)

export type habitDate = {
  dateHabit: Date | null
}

type habitDateState = {
  dateHabit: habitDate
  addDate: (date: habitDate) => void
  addOneDay: (date: Date) => void
  subtractOneDay: (date: Date) => void
}

export const newDateStore = create<habitDateState>((set) => ({
  dateHabit: { dateHabit: null },

  addDate: (newDate: habitDate) => set(() => ({ dateHabit: newDate })),

  addOneDay: (date: Date) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    set(() => ({ dateHabit: { dateHabit: newDate } }))
  },

  subtractOneDay: (date: Date) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() - 1)
    set(() => ({ dateHabit: { dateHabit: newDate } }))
  },
}))
