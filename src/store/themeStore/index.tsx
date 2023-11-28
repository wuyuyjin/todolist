import {create} from 'zustand'
import createSelectors from "../../utils/selectors";
import {createJSONStorage, persist} from "zustand/middleware";

interface themeType {
    theme: string
}

interface BearState {
    theme: string
    themes: string[]
    changeTheme: (theme: themeType["theme"]) => void
}

const useThemeStore = createSelectors(create<BearState>()(persist((set) => ({
        theme: "",

        themes: [
            "light",
            "dark",
            "cupcake",
            "bumblebee",
            "valentine",
            "halloween",
            "garden",
            "forest",
            "aqua",
            "lofi",
            "pastel",
            "fantasy",
            "wireframe",
            "black",
            "luxury",
            "dracula",
            "dim",
            "nord",
            "sunset",
        ],

        changeTheme: (theme) => set(() => ({theme: theme}))
    }), {
        name: "theme",
        storage: createJSONStorage(() => localStorage),
    }
)))


export default useThemeStore