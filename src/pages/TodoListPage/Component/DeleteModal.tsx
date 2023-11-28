import {stateType} from "../../../store/todoListStore";
import TodoListApi from "../../../api/TodoListApi";

const DeleteModal = ({item}: { item: stateType }) => {
    const {deleteApi} = TodoListApi()
    const delData = () => {
        deleteApi(item.id)
    }
    return (
        <div>
            <dialog id="delete" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl">Delete</h3>
                    <p className="py-4">确定要删除该条任务吗？？？</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-info" onClick={() => delData()}>confirm</button>
                            <button className="btn ml-2 btn-error">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default DeleteModal