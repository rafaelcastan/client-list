import { Routes, Route } from "react-router-dom"
import Home from "../pages/home"

export function PageRoutes  () {

    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<span>NotFound</span>}/>
        </Routes>
    )
}