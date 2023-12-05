import {create} from 'zustand'
import createSelectors from "../../utils/selectors";

export interface stateType {
    id: string,
    content: string,
    updateTime: string,
    serialNumber: string,
    status: number
}

interface BearState {
    data: stateType[]
    addData: ({id, content, updateTime, serialNumber, status}: { id: string, content: string, updateTime: string, serialNumber: string, status: number }) => void
    removeData: (id: string) => void
    updateData: ( id: string, content: string, updateTime: string, serialNumber: string, status: number ) => void
    searchData: (content: string) => void
}

const useTodoListStore = createSelectors(create<BearState>()((set) => ({
    data: [],

    addData: (data) => {
        const existingData = useTodoListStore.getState().data;
        const isExisting = existingData.some(
            (item) => item.content === data.content
        );

        if (!isExisting) {
            set((state) => ({
                data: [
                    ...state.data,
                    {
                        id: data.id,
                        content: data.content,
                        updateTime: data.updateTime,
                        serialNumber: data.serialNumber,
                        status: data.status,
                    },
                ],
            }));
        } else {
            console.log("内容已存在，未添加到数据中");
        }
    },

    removeData: (id) => set((state) => ({
        data: state.data.filter((item) => item.id !== id)
    })),

    updateData: (id, content, updateTime, serialNumber, status) => set((state) => ({
        data: state.data.map((item) => {
            if (id === item.id) {
                return {
                    ...item,
                    id: id,
                    content: content,
                    updateTime: updateTime,
                    serialNumber: serialNumber,
                    status: status,
                };
            }else {
                return item
            }
        })
    })),

    searchData: (content) =>
        set((state) => ({
            data: state.data.filter((item) =>
                item.content.toLowerCase().includes(content.toLowerCase())
            ),
        })),

})))

export default useTodoListStore