import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import Topbar from "./topbar/Topbar"
import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar/Sidebar"
import { drawerWidth, isMobile } from "../recoil/recoil"
import { useRecoilState, useRecoilValue } from "recoil"


const Layout = () => {
    const [isMb, setIsMb] = useRecoilState(isMobile)
    const dw = useRecoilValue(drawerWidth)

    const isMbAux = useMediaQuery( (theme) => theme.breakpoints.down('sm'))

    React.useEffect( () => {
        setIsMb(isMbAux)
    }, [isMbAux])

    return(
        <Box>
            <Topbar />
            <Sidebar />
            <Box sx={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                width: { sm: `calc(100% - ${dw}px)` },
                ml: { sm: `${dw}px` },
                mt: { xs: '58px', sm: '66px' }
            }}>
                <Outlet />
            </Box>
            
        </Box>
    )
}

export default Layout