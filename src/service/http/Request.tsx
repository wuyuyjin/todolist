import axios from "axios";
// import {ErrorTip} from "../../components/requestAlert/Tip/ErrorTip";

/**封装axios文件**/
const Request = () => {

    const instance = axios.create({
        baseURL: "http://114.132.67.226:3080",
        timeout: 5000
    })

    /**
     * http request 拦截器
     * **/
    instance.interceptors.request.use(
        (config) => {
            console.log("config.data:" + config.data)
            console.log("发起请求成功")
            return config;
        },
        (err) => {
            //基本进不来
            console.error("发起请求失败err：" + err)
            return Promise.reject(err);
        }
    );

    /**
     * http response 拦截器
     **/
    instance.interceptors.response.use(
        (response) => {
            console.log("响应请求正确", response)

            return response;
        },
        (err) => {
            //ErrorTipApi未正确进入
            console.log("响应请求出错")
            // ErrorTip(err)
            return err
        }
    );

    return {instance}
}


export default Request