import {useForm} from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from "zod";
import {Link} from "react-router-dom";
import {FontData, FormData} from "./type";
import LoginApi from "../../api/LoginApi";

const formSchema = z.object({
    email: z.string().email("请输入正确的邮箱账号"),
    // email: z.string().min(3),
    password: z.string().min(3, "请最少输入8位").max(20, "最多输入20位")
})

const Login = () => {
    const {loginPageApi} = LoginApi()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })
    const onSubmit = handleSubmit((data) => {
        //发送请求给后端
        loginPageApi(data.email, data.password)
    })

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login</h1>
                        <p className="py-6">{FontData}</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={onSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="text" placeholder="Email"
                                       className="input input-bordered" required/>
                                {errors.email?.message && <p className="text-red-600">{errors.email?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="password"
                                       className="input input-bordered" required/>
                                {errors.password?.message && <p className="text-red-600">{errors.password?.message}</p>}
                                <label className="label">
                                    <Link to="/ForgetPassword" className="label-text-alt link link-hover">Forgot
                                        password?</Link>
                                    <Link to="/Register" className="label-text-alt link link-hover">Register</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login