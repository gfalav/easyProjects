import React from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material"
import { blue } from "@mui/material/colors"
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { user } from '../../recoil/recoil'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import supabase from '../../sb/Sb'

const User = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [usrDisplay, setUsrDisplay] = React.useState(null)
    const setUsr = useSetRecoilState(user)

    const initials = async (id) => {
        let init = ''
        const {data, error} = await supabase
            .from('userdata')
            .select()
            .eq('userId', id)
            .limit(1)
            .single()
        if (error){
            alert('Error' + error)
            return
        }
        if (data) {
            if (data.name) {
                init = data.name.substring(0,1)
            }
            if (data.lastname){
                init = init + data.lastname.substring(0,1)
            }
        }
        setUsrDisplay(init)
    }

    supabase.auth.onAuthStateChange( (event, session)=> {
        if (session){
            if (session.user.id){
                setUsr(session.user.id)
                initials(session.user.id)
            } 
        } else {
            if (usrDisplay) {
                setUsrDisplay(null)
                setUsr(null)
            }
        }
    })

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const SignOutClick = async () => {
        setAnchorEl(null)
        await supabase.auth.signOut()
    }

    return(
        <Box>
            <IconButton
                onClick={handleMenu}>
                <Avatar sx={{
                    bgcolor: blue[300]
                }}>
                    { usrDisplay ?  usrDisplay : <AccountCircleIcon />}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ 
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                { !usrDisplay ? 
                <div>
                    <MenuItem component={Link} to='/auth/signin'>SignIn</MenuItem>
                    <MenuItem component={Link} to='/auth/signup'>SignUp</MenuItem>
                </div>
                :
                <div>
                <MenuItem component={Link} to='/auth/reset'>Reset</MenuItem>
                <MenuItem component={Link} to='/auth/signin' onClick={SignOutClick}>SignOut</MenuItem>
                </div>
                }
            </Menu>
        </Box>
    )
}

export default User