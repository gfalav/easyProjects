import { Box } from '@mui/material'
import bg from '../../images/bg.webp'
import React from 'react'
import { setCondClimas } from '../../app/zonas/CondClimas'
import { setConductors } from '../../app/conductors/Conductors'
import { setZonas } from '../../app/zonas/Zonas'

const Home = () => {

    React.useEffect( () => {
        
    }, [])

    return(
        <Box>
            <Box component='img' src={bg} alt='bg image' sx={{ width: '100%' }} />
        </Box>
    )
}

export default Home