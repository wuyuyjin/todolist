import { create } from 'zustand'
import createSelectors from "../../utils/selectors";
import {createJSONStorage, persist} from "zustand/middleware";

interface stateType {
    token: string
}

interface BearState {
    token: string
    setToken: (token: stateType["token"]) => void
}

const useLoginStore = createSelectors(create<BearState>()(persist((set) => ({
    token: "",
    setToken: (token) => set(() => ({token: token}))
}), {
    name: "token",
    storage: createJSONStorage(() => localStorage),
    partialize: state =>
        Object.fromEntries(
            Object.entries(state).filter(
                ([key]) => ["token"].includes(key)
            )
        )
    }
)))

export default useLoginStore