import useLoginStore from "../store/loginStore";

const Token = () => {
    const token = useLoginStore.use.token()

    return {token}
}

export default Token