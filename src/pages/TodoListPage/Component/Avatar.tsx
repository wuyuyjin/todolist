import {useNavigate} from "react-router-dom";
import LoginApi from "../../../api/LoginApi";
import useLoginStore from "../../../store/loginStore";

const Avatar = () => {
    const {logOutApi} = LoginApi()
    const navigation = useNavigate()
    const email = useLoginStore.use.email()
    const toNav = () => {
      navigation("/MyInformation")
    }

    const logOut =() => {
        logOutApi(email)
    }

    return (
        <div className="avatar fixed bottom-48 left-5">

            <details className="dropdown">
                <summary tabIndex={0} role="button" className="btn m-1 btn-accent">我的</summary>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={() => toNav()}>个人空间</a></li>
                    <li><a onClick={() => logOut()}>退出登录</a></li>
                </ul>
            </details>
        </div>
    )
}

export default Avatar