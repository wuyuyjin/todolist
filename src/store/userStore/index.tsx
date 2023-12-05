import {create} from 'zustand'
import createSelectors from "../../utils/selectors";

interface stateType {
    birthday: string,
    cityLocation: string,
    homeland: string,
    job: string,
    phone: string,
    school: string,
    sex: string,
    userEmail: string,
    userUsername: string
}

export interface updateDataType {
    birthday: string,
    cityLocation: string,
    homeland: string,
    job: string,
    phone: string,
    school: string,
    sex: string,
    userUsername: string
}



interface BearState {
    data: stateType
    // setToken: (token: stateType["token"]) => void
    picture: string

    setPicture: (picture: string) => void

    setData: (data: stateType) => void

    updateData: (birthday: string, cityLocation: string, homeland: string, job: string, phone: string, school: string, sex: string, userUsername: string) => void
}

const useUserStore = createSelectors(create<BearState>()(((set) => ({
        data: {
            birthday: "",
            cityLocation: "",
            homeland: "",
            job: "",
            phone: "",
            school: "",
            sex: "",
            userEmail: "",
            userUsername: ""
        },

        picture: "",

        setPicture: (picture) => set(() => ({picture: picture})),

        setData: (data) => set(() => ({data: data})),

        updateData: (birthday, cityLocation, homeland, job, phone, school, sex, userUsername) => set((state) => ({
            data: {
                ...state.data,
                birthday: birthday,
                cityLocation: cityLocation,
                homeland: homeland,
                job: job,
                phone: phone,
                school: school,
                sex: sex,
                userUsername: userUsername,
            }
        }))
    })
)))

export default useUserStore