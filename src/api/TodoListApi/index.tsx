import Request from "../../service/http/Request.tsx";
import useTodoListStore, {stateType} from "../../store/todoListStore";
import Token from "../../token";

const TodoListApi = () => {
    const {updateData} = useTodoListStore()
    const removeData = useTodoListStore.use.removeData()
    const setData = useTodoListStore.use.addData()
    const {instance} = Request()
    const {token} = Token()
    const showDataApi = () => {
        instance.get("/task", {
            headers: {
                "token": token
            }
        }).then(response => {
            console.log(response)
            const data = response.data.data.slice()
            data.forEach((item: stateType) => {
                setData({
                    id: item.id,
                    content: item.content,
                    updateTime: item.updateTime,
                    serialNumber: item.serialNumber,
                    status: item.status
                })
            })
        }).catch(error => {
            console.error(error)
        })
    }

    const addDataApi = (id: string, content: string, updateTime: string, serialNumber: string, status: number) => {
        instance.post("/task", {
            id: id,
            content: content,
            updateTime: updateTime,
            serialNumber: Number(serialNumber),
            status: status
        },{
            headers: {
                "token": token
            }
        }).then(response => {
            console.log(response)

            if (response.data.status === 200){
                setData({
                    id: id,
                    content: content,
                    updateTime: updateTime,
                    serialNumber: serialNumber+1,
                    status: status
                })
                alert("添加成功")
            }else {
                alert("添加失败")
            }

        }).catch(error => {
            console.error(error)
        })
    }

    const updateApi = (id: string, content: string, updateTime: string, serialNumber: string, status: number) => {
        instance.put("/task", {
            id: id,
            content: content
        }, {
            headers: {
                "token": token
            }
        }).then(response => {
            console.log(response)
            updateData(id, content, updateTime, serialNumber, status)
            alert("更新成功")
        }).catch(error => {
            console.error(error)
        })
    }

    const deleteApi = (id: string) => {
        instance.delete(`/task/${id}`, {
            headers: {
                "token": token
            }
        }).then(response => {
            console.log(response)
            removeData(id)
            alert("删除成功")
        }).catch(error => {
            console.error(error)
        })
    }

    const changeStatusApi = (id: string, content: string, updateTime: string, serialNumber: string, status: number) => {
        instance.put("/status", {
            id: id,
            status: status
        }, {
            headers: {
                "token": token
            }
        }).then(response => {
            console.log(response)
            if (response.status === 200){
                updateData(id, content, updateTime, serialNumber, status)
                alert("修改状态成功")
            }else {
                alert("修改状态失败")
            }

        }).catch(error => {
            console.error("error:"+error)
        })
    }

    return {showDataApi, deleteApi, updateApi,addDataApi,changeStatusApi}
}

export default TodoListApi