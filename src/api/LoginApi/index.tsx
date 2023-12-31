import Request from "../../service/http/Request.tsx";
import {useNavigate} from "react-router-dom";
import useLoginStore from "../../store/loginStore";
import Token from "../../token";

const LoginApi = () => {
    const navigate = useNavigate();
    const setToken = useLoginStore.use.setToken()
    const setEmail = useLoginStore.use.setEmail()
    const {token} = Token()
    const {instance} = Request()
    const loginPageApi = async (email: string, password: string) => {
        await instance.post("/userEmail/login", {
            email: email,
            password: password
        }).then(response => {
            console.log("res=" + response)
            setToken(response.data.token)
            if (response.data.status === 200) {
                setEmail(email)
                navigate("/TodoListPage")
            } else {
                alert("账号未找到")
            }
        }).catch(error => {
            console.error("err=" + error)
        })
    }

    const forgetPasswordApi = () => {

    }

    const registerApi = async (userName: string, email: string, code: string, password: string) => {
        await instance.post("/userEmail/signup", {
            username: userName,
            email: email,
            code: code,
            password: password,
        }).then(response => {
            console.log(response)
            if (response.data.status === 200) {
                alert("注册成功")
                navigate("/")
            } else {
                alert("注册失败")
            }
        }).catch(error => {
            alert("服务器出错，请联系管理员")
            console.error(error)
        })
    }

    const sendCodeApi = async (email: string) => {
        await instance.get(`/userEmail/emailcode?email=${email}`)
            .then(response => {
                console.log(response)
                alert("验证码发送成功")
            }).catch(error => {
                console.error(error)
            })
    }

    const logOutApi = async (email: string) => {
        await instance.delete(`userEmail/logout?email=${email}`, {
            headers: {
                "token": token
            }
        }).then(response => {
            console.log(response)
            if (response.status === 200){
                localStorage.removeItem("token")
                alert("退出登录成功")
                navigate("/")
            }
        }).catch(error => {
            console.error(error)
        })
    }

    return {loginPageApi, forgetPasswordApi, registerApi, sendCodeApi, logOutApi}
}

export default LoginApi