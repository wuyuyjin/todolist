import Request from "../../service/http/Request.tsx";
import TimerComponent from "../../Components/TimerComponent";
import LoginApi from "../LoginApi";

const SendCodeApi = () => {
    const {instance} = Request()
    const {getTime} = TimerComponent()
    const {sendCodeApi} = LoginApi()
    const sendCode = (email: string) => {
        if (email) {
            const reg = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            const isok = reg.test(email)
            if (isok) {
                instance.get(`/userEmail/exit?email=${email}`)
                    .then(response => {
                        if (response.data.data === "该用户不存在") {
                            alert("正在发送验证码")
                            getTime()
                            sendCodeApi(email)
                        } else {
                            alert("账号已存在，无需重复注册")
                        }
                    })
            } else {
                alert("请输入正确的Email")
            }
        } else {
            alert("Email为空")
        }
    }

    return {sendCode}
}

export default SendCodeApi