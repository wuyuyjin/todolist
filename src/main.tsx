import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import MainRoute from "./router";

const {router} = MainRoute()

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <RouterProvider router={router}/>
//     </React.StrictMode>,
// )

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
