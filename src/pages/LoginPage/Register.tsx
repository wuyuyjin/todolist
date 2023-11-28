import {useForm} from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from "zod";
import {Link} from "react-router-dom";
import {FontData, FormData} from "./type";
import {useState} from "react";
import TimerComponent from "../../Components/TimerComponent";
import LoginApi from "../../api/LoginApi";
import SendCodeApi from "../../api/SendCodeApi";

const formSchema = z.object({
    userName: z.string().min(3, {message: '用户名至少3个字'}).max(10, "用户名不能超过10个字"),
    email: z.string().email("请输入正确的邮箱账号"),
    code: z.string().length(4, "请输入正确的四位验证码"),
    password: z.string().min(8, "请最少输入8位").max(20, "最多输入20位"),
    againpassword: z.string().min(8, "请最少输入8位").max(20, "最多输入20位")
}).refine((FormData) => FormData.password === FormData.againpassword, {
    path: ["againpassword"],
    message: "两次输入的密码不一致哦！"
})

const Register = () => {

    const [email, setemail] = useState("")

    //调用计时器组件TimerComponent
    const {isTiming, remainingTime} = TimerComponent()
    const {registerApi} = LoginApi()
    const {sendCode} = SendCodeApi()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })
    const onSubmit = handleSubmit((data) => {
        registerApi(data.userName, data.email, data.code, data.password)
    })



    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register</h1>
                        <p className="py-6">{FontData}</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={onSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">userName</span>
                                </label>
                                <input {...register("userName")} type="text" placeholder="userName"
                                       className="input input-bordered" required/>
                                {errors.userName?.message && <p className="text-red-600">{errors.userName?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">email</span>
                                </label>
                                <input {...register("email")} type="text" placeholder="email"
                                       className="input input-bordered join-item" required
                                       onChange={event => setemail(event.target.value)}
                                />
                                {errors.email?.message && <p className="text-red-600">{errors.email?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">code</span>
                                </label>
                                <div className="join">
                                    <input {...register("code")} type="text" placeholder="code"
                                           className="input input-bordered join-item" required/>
                                    <button className={`btn join-item`}
                                            disabled={isTiming}
                                            onClick={() => sendCode(email)}>{isTiming ? remainingTime + "s" : "Send Code"}</button>
                                </div>
                                {errors.code?.message && <p className="text-red-600">{errors.code?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="password"
                                       className="input input-bordered" required/>
                                {errors.password?.message && <p className="text-red-600">{errors.password?.message}</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Check Password</span>
                                </label>
                                <input {...register("againpassword")} type="password" placeholder="Check Password"
                                       className="input input-bordered" required/>
                                {errors.againpassword?.message &&
                                    <p className="text-red-600">{errors.againpassword?.message}</p>}
                            </div>

                            <label className="label">
                                <Link to="/" className="label-text-alt link link-hover">Login</Link>
                                <Link to="/ForgetPassword" className="label-text-alt link link-hover">Forgot
                                    password?</Link>
                            </label>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register