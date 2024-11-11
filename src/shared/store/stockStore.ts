import { create } from 'zustand'

interface UserData {
  userId: string | null;
  email: string | null;
}

interface UserStore extends UserData {
  setUser: (user: UserData) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  email: null,
  setUser: (user) => set({ userId: user.userId, email: user.email }),
}));