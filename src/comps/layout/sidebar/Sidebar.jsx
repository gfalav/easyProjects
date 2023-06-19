import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { drawerWidth, isMobile, toggleMenu } from "../../recoil/recoil"
import { Box, Drawer } from "@mui/material"
import SideArea from "./SideArea"
import SideLogo from "./SideLogo"

const Sidebar = () => {
    const dw = useRecoilValue(drawerWidth)
    const isMb = useRecoilValue(isMobile)
    const [tMenu, setTMenu] = useRecoilState(toggleMenu)

    return(

        <Box>
                <Drawer 
                    variant={isMb ? 'temporary' : 'persistent'}
                    anchor="left"
                    open={isMb ? tMenu : true}
                    onClose={() => setTMenu(false)}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', 
                                                width: dw, 
                                                backgroundColor: '#233044',
                                                color: '#b8b8b8' 
                                              },
                        }}
                >
                    <SideLogo />
                    <SideArea />
                </Drawer>
        </Box>
    )
}

export default Sidebar