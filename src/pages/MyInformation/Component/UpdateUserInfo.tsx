import UserApi from "../../../api/UserApi";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {updateDataType} from "../../../store/userStore";
import {useState} from "react";
import Request from "../../../service/http/Request.tsx";
import Token from "../../../token";

const formSchema = z.object({
    userUsername: z.string().min(1).max(10),
    sex: z.string(),
    birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/,"例子：2000-01-01"),
    cityLocation: z.string(),
    homeland: z.string(),
    phone: z.string().length(11, "请输入正确的手机号码"),
    job: z.string(),
    school: z.string()
})

const UpdateUserInfo = () => {

    const {updateUserInfo} = UserApi()
    const [file, setfile] = useState(null);
    const {instance} = Request()
    const {token} = Token()
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setfile(file);
    };


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<updateDataType>({
        resolver: zodResolver(formSchema),
    })
    const onSubmit = handleSubmit((data) => {
        //将完善好的数据传给后端
        updateUserInfo(data)
    })

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
           //上传图片
            try {
                // 使用 FormData 发送 POST 请求
                const response = await instance.post("/information/uploadPhoto", formData, {
                    headers: {
                        "token": token,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.data.status === 200){
                    alert("上传图片成功")
                }else {
                    alert("上传图片失败")
                }
            } catch (error) {
                console.error(error);
            }

        }
    }

    return (
        <div>
            <dialog id="updateUserInfo" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl">Update</h3>
                    <div className="py-4">

                        <div onSubmit={onSubmit} className="card-body">
                            <div>
                                <input type="file"
                                       accept="image/png,image/jpeg,image/gif,image/jpg"
                                       className="file-input file-input-bordered w-full max-w-xs"
                                       onChange={handleFileChange}
                                />
                                <button className="btn btn-primary" onClick={handleUpload}>上传</button>
                            </div>

                            <form onSubmit={onSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">名字</span>
                                    </label>
                                    <input type="text" placeholder="名字"
                                           className="input input-bordered" required
                                           {...register("userUsername")}
                                    />
                                    {errors.userUsername?.message &&
                                        <p className="text-red-600">{errors.userUsername?.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">性别</span>
                                    </label>
                                    <input type="text" placeholder="性别"
                                           className="input input-bordered" required
                                           {...register("sex")}
                                    />
                                    {errors.sex?.message && <p className="text-red-600">{errors.sex?.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">生日</span>
                                    </label>
                                    <input type="text" placeholder="生日"
                                           className="input input-bordered" required
                                           {...register("birthday")}
                                    />
                                    {errors.birthday?.message &&
                                        <p className="text-red-600">{errors.birthday?.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">现居城市</span>
                                    </label>
                                    <input type="text" placeholder="现居城市"
                                           className="input input-bordered" required
                                           {...register("cityLocation")}
                                    />
                                    {errors.cityLocation?.message &&
                                        <p className="text-red-600">{errors.cityLocation?.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">家乡</span>
                                    </label>
                                    <input type="text" placeholder="家乡"
                                           className="input input-bordered" required
                                           {...register("homeland")}
                                    />
                                    {errors.homeland?.message &&
                                        <p className="text-red-600">{errors.homeland?.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">联系方式</span>
                                    </label>
                                    <input type="text" placeholder="联系方式"
                                           className="input input-bordered" required
                                           {...register("phone")}
                                    />
                                    {errors.phone?.message && <p className="text-red-600">{errors.phone?.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">身份</span>
                                    </label>
                                    <input type="text" placeholder="身份"
                                           className="input input-bordered" required
                                           {...register("job")}
                                    />
                                    {errors.job?.message && <p className="text-red-600">{errors.job?.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">学校</span>
                                    </label>
                                    <input type="text" placeholder="学校"
                                           className="input input-bordered" required
                                           {...register("school")}
                                    />
                                    {errors.school?.message && <p className="text-red-600">{errors.school?.message}</p>}
                                </div>


                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Submit</button>
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

export default UpdateUserInfo