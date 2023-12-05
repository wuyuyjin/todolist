import Request from "../../service/http/Request.tsx";
import Token from "../../token";
import useUserStore, {updateDataType} from "../../store/userStore";

const UserApi = () => {
    const {token} = Token()
    const {instance} = Request()
    const setData = useUserStore.use.setData()
    const setPicture = useUserStore.use.setPicture()
    const getUserInfo = async () => {
        await instance.get("/information", {
            headers: {
                'token': token
            }
        }).then(response => {
            setData(response.data.data)
        }).catch(error => {
            console.error(error)
        })
    }

    const updateUserInfo = async (data: updateDataType) => {
        console.log(data)
        await instance.put("/information/perfect", {
            userUsername: data.userUsername,
            sex: data.sex,
            birthday: data.birthday,
            phone: data.phone,
            job: data.job,
            school: data.school,
            cityLocation: data.cityLocation,
            homeland: data.homeland
        }, {
            headers: {
                "token": token
            }
        }).then(response => {
            if(response.data.status === 200){
                alert("完善个人信息成功")
            }else {
                alert("完善个人信息失败")
            }
        }).catch(error => {
            console.error(error)
        })
    }

    const getUserPhoto = async () => {
        await instance.get("/information/preview", {
            headers: {
                "token": token,
            }
        }).then(response => {
            if (response.data.status === 200) {
                setPicture(response.data.data)
            } else {
                alert("获取头像失败")
            }
        }).catch(error => {
            console.error(error)
        })
    }

    return {getUserInfo, updateUserInfo, getUserPhoto}
}

export default UserApi