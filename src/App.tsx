import {Outlet} from "react-router-dom";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import useThemeStore from "./store/themeStore";
import HeaderComponent from "./Components/HeaderComponent";

const App = () => {
    const [animationParent] = useAutoAnimate()
    const theme = useThemeStore.use.theme()
    return (
        <div ref={animationParent} data-theme={theme} className="relative">
            <div className="fixed w-full inset-x-0 top-0">
                <HeaderComponent/>
            </div>
            <Outlet/>
        </div>
    )
}

export default App