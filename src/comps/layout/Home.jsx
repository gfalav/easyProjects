import { Box } from '@mui/material'
import bg from '../../images/bg.webp'
import React from 'react'

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