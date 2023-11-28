import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from "../App.tsx";
import Login from "../pages/LoginPage/login.tsx";
import ErrorPage from "../pages/ErrorPage";
import ForgetPassword from "../pages/LoginPage/ForgetPassword.tsx";
import Register from "../pages/LoginPage/Register.tsx";
import React, {Suspense} from "react";
import LoadingPage from "../pages/LoadingPage";
// import TodoListPage from "../pages/TodoListPage";

const TodoListPage = React.lazy(() => import("../pages/TodoListPage"))

const MainRoute = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                path="/"
                element={<App/>}
                errorElement={<ErrorPage/>}
            >
                <Route errorElement={<ErrorPage/>}>

                    <Route index element={<Login/>}/>
                    <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
                    <Route path="/Register" element={<Register/>}/>
                    <Route path="/TodoListPage"
                           element={
                               <Suspense fallback={<LoadingPage/>}>
                                   <TodoListPage/>
                               </Suspense>
                           }/>
                </Route>
            </Route>
        )
    )

    return {router}
}


export default MainRoute