import { Badge, Box, IconButton } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email'

const Messages = () => {


    return(
        <Box>
            <IconButton size="large">
                <Badge badgeContent={4} color="error">
                    <EmailIcon fontSize="large"/>
                </Badge>
            </IconButton>
        </Box>
    )
}

export default Messages