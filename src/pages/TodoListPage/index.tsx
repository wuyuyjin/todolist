import TodoListStore, {stateType} from "../../store/todoListStore";
import {useEffect, useState} from "react";
import DeleteModal from "./Component/DeleteModal.tsx";
import UpdateModal from "./Component/UpdateModal.tsx";
import TodoListApi from "../../api/TodoListApi";
import AddDataModal from "./Component/AddDataModal.tsx";
import Timer from "../../utils/timer";
import Avatar from "./Component/Avatar.tsx";

const TodoListPage = () => {
    const useTodoListStore = TodoListStore.use.data()
    const [item, setItem] = useState({
        id: "",
        content: "",
        updateTime: "",
        serialNumber: "",
        status: 0
    })

    const [searchValue, setValue] = useState("")
    const {showDataApi,changeStatusApi} = TodoListApi()
    const searchData = TodoListStore.use.searchData()
    const {formattedDateTime} = Timer()

    useEffect(() => {
        showDataApi()
    }, [])

    const deleteData = (item: stateType) => {
        if (document) {
            (document.getElementById('delete') as HTMLFormElement).showModal();
            setItem(item)
        }
    }

    const updateData = (item: stateType) => {
        if (document) {
            (document.getElementById('update') as HTMLFormElement).showModal();
            setItem(item)
        }
    }

    const add = () => {
        if (document) {
            (document.getElementById('addData') as HTMLFormElement).showModal();
        }
    }

    const search = () => {
        searchData(searchValue)
    }

    const changeStatus = (item: stateType) => {
        if (item.status===1){
            item.status = 0
            changeStatusApi(item.id,item.content,formattedDateTime,item.serialNumber,item.status)
        }else {
            item.status = 1
            changeStatusApi(item.id,item.content,formattedDateTime,item.serialNumber,item.status)
        }
    }

    return (
        <div>
            <div>
                {/*我的头像*/}
                <Avatar/>

                <table className="table table-pin-rows table-pin-cols w-full table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                            <label>
                                <a className="btn btn-ghost text-xl">TodoList</a>
                            </label>
                        </th>
                        <th className="w-96">序号</th>
                        <th className="w-96">内容</th>
                        <th className="w-96">时间</th>
                        <th>
                            搜索：
                            <div className="join">
                                <input className="input input-bordered join-item" placeholder="search"
                                       value={searchValue} onChange={e => setValue(e.target.value)}
                                />
                                <button className="btn join-item" onClick={() => search()}>search</button>
                                <button className="btn btn-primary ml-2" onClick={() => add()}>Add</button>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {useTodoListStore.slice().map((item) => (
                        <tr key={item.id}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox"/>
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="font-bold">任务{item.serialNumber}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.content}
                                <br/>
                            </td>
                            <td>{item.updateTime}</td>
                            <th className="w-36">
                                <td>
                                    <button className="btn btn-info btn-xs" onClick={() => updateData(item)}>修改
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-error btn-xs" onClick={() => deleteData(item)}>删除
                                    </button>
                                </td>
                                <td>
                                    {
                                        item.status ?
                                            <button className="btn btn-success btn-xs" onClick={() => changeStatus(item)}>已完成</button> :
                                            <button className="btn btn-secondary btn-xs" onClick={() => changeStatus(item)}>未完成</button>
                                    }
                                </td>
                            </th>
                        </tr>
                    ))}

                    </tbody>
                    {/* foot */}
                    <tfoot>
                    {/*<tr>*/}
                    {/*    <th></th>*/}
                    {/*    <th>序号</th>*/}
                    {/*    <th>内容</th>*/}
                    {/*    <th>更新时间</th>*/}
                    {/*    <th></th>*/}
                    {/*</tr>*/}
                    </tfoot>
                </table>
                <DeleteModal item={item}/>
                <UpdateModal item={item}/>
                <AddDataModal/>
            </div>
        </div>
    )
}

export default TodoListPage