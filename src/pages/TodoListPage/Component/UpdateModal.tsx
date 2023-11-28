import  {stateType} from "../../../store/todoListStore";
import {useState} from "react";
import Timer from "../../../utils/timer";
import TodoListApi from "../../../api/TodoListApi";

const UpdateModal = ({item}: { item: stateType }) => {
    const {formattedDateTime} = Timer()
    const {updateApi} = TodoListApi()
    const [content, setContent] = useState("")

    const update = () => {
        if (content){
            updateApi(item.id, content, formattedDateTime, item.serialNumber, item.status)
        }else {
            alert("未填入修改信息")
        }
    }

    return (
        <div>
            <dialog id="update" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl">Update</h3>
                    <div className="py-4">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">content</span>
                                </label>
                                <input type="text" placeholder="content"
                                       className="input input-bordered" required
                                       value={content} onChange={e => setContent(e.target.value)}
                                />
                            </div>

                            <form method="dialog">
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary" onClick={() => update()}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn ml-2 btn-error">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default UpdateModal