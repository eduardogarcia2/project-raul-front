import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useColorStore = create(persist(
    (set) => ({
        spaces: {},
        setSpaceColor: (spaceId: any, color: any) => set((state: any) => ({
            spaces: {
                ...state.spaces,
                [spaceId]: color,
            },
        })),
    }),
    {
        name: 'my-app-storage',
    }
));

export default useColorStore;
