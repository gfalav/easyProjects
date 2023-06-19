import { Box } from "@mui/material"
import Mapa from "./Mapa"
import Lista from "./Lista"

const Tramos = () =>  {

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%'
        }}>
            <Box sx={{ width:'50%', bgcolor: 'grey'}}><Mapa /></Box>
            <Box sx={{ width:'50%', bgcolor: 'lightblue'}}><Lista /></Box>
        </Box>
    )
}

export default Tramos