import { Badge, Box, IconButton } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications'

const Notification = () => {


    return(
        <Box>
            <IconButton size="large">
                <Badge badgeContent={6} color="error">
                    <NotificationsIcon fontSize="large"/>
                </Badge>
            </IconButton>
        </Box>
    )
}

export default Notification