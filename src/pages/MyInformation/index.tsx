import {useEffect} from "react";
import UserApi from "../../api/UserApi";
import useUserStore from "../../store/userStore";
import UpdateUserInfo from "./Component/UpdateUserInfo.tsx";

const MyInformation = () => {
    const data = useUserStore.use.data()
    const {getUserInfo,getUserPhoto} = UserApi()
    const picture = useUserStore.use.picture()

    useEffect(() => {
        getUserInfo()
        getUserPhoto()
    }, []);

    const changeInfo = () => {
        if (document) {
            (document.getElementById('updateUserInfo') as HTMLFormElement).showModal();
        }
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <UpdateUserInfo/>
            <div className="hero-content flex-col lg:flex-row">
                <img src={picture}
                     className="max-w-sm rounded-lg shadow-2xl"/>
                <div>
                    <button className="btn btn-primary" onClick={() => changeInfo()}>完善个人信息</button>
                    <p className="py-2">名字: {data.userUsername}</p>
                    <p className="py-2">性别: {data.sex}</p>
                    <p className="py-2">生日: {data.birthday}</p>
                    <p className="py-2">居住城市: {data.cityLocation}</p>
                    <p className="py-2">家乡: {data.homeland}</p>
                    <p className="py-2">身份: {data.job}</p>
                    <p className="py-2">学校: {data.school}</p>
                    <p className="py-2">联系方式: {data.phone}</p>
                    <p className="py-2">邮箱: {data.userEmail}</p>

                </div>
            </div>
        </div>
    )
}

export default MyInformation