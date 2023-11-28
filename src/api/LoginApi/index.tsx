import Request from "../../service/http/Request.tsx";
import {useNavigate} from "react-router-dom";
import useLoginStore from "../../store/loginStore";

const LoginApi = () => {
    const navigate = useNavigate();
    const setToken = useLoginStore.use.setToken()
    const {instance} = Request()
    const loginPageApi = async (email: string, password: string) => {
        await instance.post("/userEmail/login", {
            email: email,
            password: password
        }).then(response => {
            console.log("res=" + response)
            setToken(response.data.token)
            if (response.data.status === 200) {
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
            userName: userName,
            email: email,
            code: code,
            password: password,
        }).then(response => {
            console.log(response)
            if(response.data.status === 200){
                alert("注册成功")
                navigate("/")
            }else {
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

    return {loginPageApi, forgetPasswordApi, registerApi, sendCodeApi}
}

export default LoginApi