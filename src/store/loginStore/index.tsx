import { create } from 'zustand'
import createSelectors from "../../utils/selectors";
import {createJSONStorage, persist} from "zustand/middleware";

interface stateType {
    token: string
    email: string
}

interface BearState {
    token: string
    email: string
    setToken: (token: stateType["token"]) => void
    setEmail: (email: stateType["email"]) => void
}

const useLoginStore = createSelectors(create<BearState>()(persist((set) => ({
    token: "",

    email: '',
    setToken: (token) => set(() => ({token: token})),

    setEmail: (email) => set(() => ({email: email}))
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